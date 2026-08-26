// Build the design-sync bundle: one standalone preview card per gallery entry,
// plus any direction-board mocks, plus the card manifest and a render-check.
//
//   npm run ds:previews          (writes <project>/.design-sync/)
//
// Output shape (what the DesignSync tool pushes to a claude.ai/design project):
//   .design-sync/previews/<slug>.html   self-contained card; first line is the
//                                       <!-- @dsCard --> marker the Design System
//                                       pane indexes
//   .design-sync/_ds_manifest.json      the card index (name/path/group/viewport)
//   .design-sync/.render-check.json     validation counts the design-sync skill
//                                       reports via report_validate
//
// Component cards render each gallery entry's previewRender (falling back to
// render) with react-dom/server. Direction cards (the B2 direction board) are
// hand-authored body markup that design-expert drops in dist/web/ui/board/*.html
// — a hero screen mock in the proposed direction. Both are wrapped in the same
// tokens.css + ui.css the app ships, so a card is pixel-true to the product.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderToStaticMarkup } from 'react-dom/server';
import { galleryEntries } from '../web/ui/gallery';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const outDir = join(root, '.design-sync');
const tokensCss = readFileSync(join(root, 'dist/web/tokens.css'), 'utf8');
const uiCss = readFileSync(join(root, 'dist/web/ui/ui.css'), 'utf8');

const pageCss = `
* { box-sizing: border-box; }
body {
  margin: 24px;
  background: var(--color-surface);
  color: var(--color-ink);
  font-family: var(--type-family-body);
  font-weight: var(--type-weight-body);
  font-size: var(--type-size-body);
  line-height: var(--type-leading-body);
}`;

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const attr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const countElements = (markup: string) => (markup.match(/<[a-z]/g) ?? []).length;

// The shared card shell — marker line, then a standalone HTML doc styled by the
// same token + ui css the running app uses.
function card(markerAttrs: string, title: string, body: string): string {
  return `<!-- @dsCard ${markerAttrs} -->
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${attr(title)}</title>
<style>${tokensCss}${uiCss}${pageCss}</style>
</head>
<body>
${body}
</body>
</html>
`;
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(join(outDir, 'previews'), { recursive: true });

type CheckEntry = { path: string; status: 'ok' | 'bad' | 'thin'; detail?: string };
const checks: CheckEntry[] = [];
const cards: { name: string; path: string; group: string; subtitle?: string; viewport: { width: number } }[] = [];
const markupByPath = new Map<string, string>();

for (const entry of galleryEntries) {
  const path = `previews/${slugify(`${entry.group}-${entry.name}`)}.html`;
  let markup = '';
  let status: CheckEntry['status'] = 'ok';
  let detail: string | undefined;
  try {
    markup = renderToStaticMarkup(<>{(entry.previewRender ?? entry.render)()}</>);
  } catch (e) {
    status = 'bad';
    detail = e instanceof Error ? e.message : String(e);
  }
  const elementCount = countElements(markup);
  if (status === 'ok' && elementCount < 2) {
    status = 'thin';
    detail = `only ${elementCount} element(s) in the rendered card`;
  }

  const markerAttrs = `group="${attr(entry.group)}" name="${attr(entry.name)}"${entry.subtitle ? ` subtitle="${attr(entry.subtitle)}"` : ''} width="720"`;
  writeFileSync(join(outDir, path), card(markerAttrs, entry.name, markup));
  markupByPath.set(path, markup);
  checks.push({ path, status, detail });
  cards.push({ name: entry.name, path, group: entry.group, subtitle: entry.subtitle, viewport: { width: 720 } });
}

// The B2 direction board: hero mocks design-expert authored for a proposed
// direction. Body markup (optionally with its own <style>) using ui classes and
// token vars; wrapped in the same shell at a screen width. Empty folder (the
// common case, a plain design-system sync) is a no-op.
const boardDir = join(root, 'dist/web/ui/board');
if (existsSync(boardDir)) {
  for (const file of readdirSync(boardDir).filter((f) => f.endsWith('.html')).sort()) {
    const name = file.replace(/\.html$/, '').replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const body = readFileSync(join(boardDir, file), 'utf8');
    const path = `previews/direction-${slugify(name)}.html`;
    const elementCount = countElements(body);
    const status: CheckEntry['status'] = elementCount < 2 ? 'thin' : 'ok';
    writeFileSync(join(outDir, path), card(`group="Direction" name="${attr(name)}" width="1200"`, name, body));
    markupByPath.set(path, body);
    checks.push({ path, status, detail: status === 'thin' ? `only ${elementCount} element(s)` : undefined });
    cards.push({ name, path, group: 'Direction', viewport: { width: 1200 } });
  }
}

// Identical markup across different cards means the variants aren't actually
// varying — flag every member of a duplicate group.
const byMarkup = new Map<string, string[]>();
for (const [path, markup] of markupByPath) {
  if (!markup) continue;
  byMarkup.set(markup, [...(byMarkup.get(markup) ?? []), path]);
}
const identicalPaths = new Set([...byMarkup.values()].filter((v) => v.length > 1).flat());

const report = {
  total: checks.length,
  bad: checks.filter((c) => c.status === 'bad').length,
  thin: checks.filter((c) => c.status === 'thin').length,
  variantsIdentical: identicalPaths.size,
  iterations: 1,
  files: checks.map((c) => ({ ...c, variantsIdentical: identicalPaths.has(c.path) || undefined })),
};

writeFileSync(join(outDir, '_ds_manifest.json'), JSON.stringify({ cards }, null, 2) + '\n');
writeFileSync(join(outDir, '.render-check.json'), JSON.stringify(report, null, 2) + '\n');

console.log(
  `ds-previews: ${report.total} cards -> .design-sync/ (bad ${report.bad}, thin ${report.thin}, identical ${report.variantsIdentical})`,
);
for (const c of checks) if (c.status !== 'ok') console.log(`  ${c.status.toUpperCase()}: ${c.path}${c.detail ? ` — ${c.detail}` : ''}`);
process.exit(report.bad > 0 ? 1 : 0);
