import { useMemo, useState } from 'react';
import {
  averageOf12,
  averageOf5,
  finalMs,
  formatAverage,
  formatScoreSheet,
  formatTime,
  rollingWindow,
} from '../../solve/results';
import { asResult, dailyAttempts, fastestBoard, fewestMovesBoard, patternBest, type StoredSolve, type TimerMode } from '../../store/records';
import { PATTERNS } from '../../cube/patterns';
import { FACE_ORDER, FACE_WORDS, PALETTES, type PaletteId } from '../cube/palette';
import { Mark } from './Mark';
import { ABOUT_PARAGRAPHS, CONTROLS, EMPTY_STATES, FEWEST_MOVES_DISCLOSURE, MODE_ROWS } from './copy';

type Route = 'menu' | 'records' | 'patterns' | 'settings' | 'about' | 'mode' | 'controls';
type Segment = 'fastest' | 'fewest' | 'history';

interface Props {
  solves: StoredSolve[];
  storageUnavailable: boolean;
  today: string;
  mode: TimerMode;
  paletteId: PaletteId;
  soundOn: boolean;
  onPalette: (id: PaletteId) => void;
  onSound: (on: boolean) => void;
  onMode: (mode: TimerMode) => void;
  onClose: () => void;
  onStartDaily: () => void;
  onStartPattern: (id: (typeof PATTERNS)[number]['id']) => void;
}

const SEGMENTS: { id: Segment; label: string }[] = [
  { id: 'fastest', label: 'FASTEST' },
  { id: 'fewest', label: 'FEWEST MOVES' },
  { id: 'history', label: 'HISTORY' },
];

const shortDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }).toUpperCase();

function Row({ children, best = false }: { children: React.ReactNode; best?: boolean }) {
  return (
    <li className="board__row" data-best={best}>
      {children}
    </li>
  );
}

export function Sheets(props: Props) {
  const [route, setRoute] = useState<Route>('menu');
  const [segment, setSegment] = useState<Segment>('fastest');
  const { solves, today } = props;

  const fastest = useMemo(() => fastestBoard(solves), [solves]);
  const fewest = useMemo(() => fewestMovesBoard(solves), [solves]);
  const history = useMemo(() => [...solves].sort((a, b) => b.createdAt.localeCompare(a.createdAt)), [solves]);
  const daily = useMemo(() => dailyAttempts(solves, today), [solves, today]);

  // Averages read the competition stream only: casual solves have no inspection and no
  // penalties, so mixing them in would make the number mean nothing.
  const competition = useMemo(
    () => solves.filter((s) => s.mode === 'competition' && s.goal.kind === 'solved' && !s.hinted).map(asResult),
    [solves],
  );
  const ao5 = rollingWindow(competition, 5);
  const ao12 = rollingWindow(competition, 12);

  const back = route === 'menu' ? null : route === 'about' ? 'settings' : 'menu';

  const title =
    route === 'menu' ? 'MENU'
    : route === 'records' ? 'RECORDS'
    : route === 'patterns' ? 'PATTERNS'
    : route === 'settings' ? 'SETTINGS'
    : route === 'mode' ? 'TIMER MODE'
    : route === 'controls' ? 'CONTROLS'
    : 'ABOUT';

  return (
    <div className="sheet" role="dialog" aria-label={title}>
      <div className="sheet__head">
        <h2 className="sheet__title">
          {route === 'menu' && <Mark size={18} />}
          {title}
        </h2>
        {back ? (
          <button className="control" onClick={() => setRoute(back as Route)}>
            <span className="control__glyph">‹</span> BACK
          </button>
        ) : (
          <button className="control" onClick={props.onClose}>
            CLOSE
          </button>
        )}
      </div>

      <div className="sheet__body" key={route}>
        {props.storageUnavailable && (
          <p className="board__warning">
            This device is not letting the app store anything, so nothing here will be kept. A private window
            usually causes it. The cube still works.
          </p>
        )}

        {route === 'menu' && (
          <ul className="board__list menu">
            {[
              ['RECORDS', 'Fastest, fewest moves, and every solve.', () => setRoute('records')],
              ['DAILY SCRAMBLE', "One scramble a day. Today's attempts sit on their own board.", props.onStartDaily],
              ['PATTERNS', 'Checkerboard, cube in a cube, superflip.', () => setRoute('patterns')],
              // Blurbs on this list preview the destination's OWN row names rather than
              // summarising it -- which is what makes the menu searchable by eye, and why
              // this one reads as a list rather than a sentence.
              ['CONTROLS', 'Turn, look around, two fingers, reset.', () => setRoute('controls')],
              ['SETTINGS', 'Palette, sound, timer mode, about.', () => setRoute('settings')],
            ].map(([label, blurb, go]) => (
              <li key={label as string}>
                <button className="menu__row" onClick={go as () => void}>
                  <span className="menu__label">{label as string}</span>
                  <span className="menu__blurb">{blurb as string}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {route === 'controls' && (
          <ul className="board__list menu">
            {CONTROLS.map(([label, blurb]) => (
              <li key={label}>
                <div className="menu__row">
                  <span className="menu__label">{label}</span>
                  <span className="menu__blurb">{blurb}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        {route === 'records' && (
          <>
            {/* The only place Ao5 and Ao12 appear, and only in the mode where they mean
                something. NOT WCA sits under the LABEL, not the number, so it reads as
                a fact about the format rather than a caveat on one result. */}
            {props.mode === 'competition' && (
              <div className="stat-row">
                <div className="stat">
                  <span className="stat__label">AO5</span>
                  <span className="stat__value">{ao5 ? formatAverage(averageOf5(ao5)) : '—'}</span>
                </div>
                <div className="stat">
                  <span className="stat__label">
                    AO12 <span className="split__scope">NOT WCA</span>
                  </span>
                  <span className="stat__value">{ao12 ? formatAverage(averageOf12(ao12)) : '—'}</span>
                </div>
              </div>
            )}

            <div className="segments" role="tablist">
              {SEGMENTS.map((s) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={segment === s.id}
                  className="segment"
                  data-active={segment === s.id}
                  onClick={() => setSegment(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {segment === 'fastest' &&
              (fastest.length === 0 ? (
                <p className="board__empty">{EMPTY_STATES.fastest}</p>
              ) : (
                <ol className="board__list">
                  {fastest.map((s, i) => (
                    <Row key={s.id} best={i === 0}>
                      <span className="board__rank">{i + 1}</span>
                      <span className="board__value">{formatScoreSheet(asResult(s))}</span>
                      <span className="board__meta">{shortDate(s.createdAt)}</span>
                    </Row>
                  ))}
                </ol>
              ))}

            {segment === 'fewest' && (
              <>
                {/* The OBTM slice cost and the not-really-FMC claim, in one sentence
                    rather than two separate warnings. */}
                <p className="board__note">{FEWEST_MOVES_DISCLOSURE}</p>
                {fewest.length === 0 ? (
                  <p className="board__empty">{EMPTY_STATES.fewest}</p>
                ) : (
                  <ol className="board__list">
                    {fewest.map((s, i) => (
                      <Row key={s.id} best={i === 0}>
                        <span className="board__rank">{i + 1}</span>
                        <span className="board__value">{s.moveCount} moves</span>
                        <span className="board__meta">{shortDate(s.createdAt)}</span>
                      </Row>
                    ))}
                  </ol>
                )}
              </>
            )}

            {segment === 'history' &&
              (history.length === 0 ? (
                <p className="board__empty">{EMPTY_STATES.history}</p>
              ) : (
                <ol className="board__list">
                  {history.slice(0, 60).map((s) => (
                    <Row key={s.id}>
                      <span className="board__value">{formatScoreSheet(asResult(s))}</span>
                      <span className="board__meta">
                        {s.moveCount} moves
                        {s.hinted ? ' · PRACTICE' : ''}
                        {s.goal.kind === 'pattern' ? ` · ${s.goal.pattern.toUpperCase()}` : ''}
                        {' · '}
                        {shortDate(s.createdAt)}
                      </span>
                    </Row>
                  ))}
                </ol>
              ))}

            <section className="board">
              <h3 className="board__title">TODAY</h3>
              {daily.length === 0 ? (
                <p className="board__empty">Today&rsquo;s scramble is waiting.</p>
              ) : (
                <ol className="board__list">
                  {daily.map((s) => (
                    <Row key={s.id}>
                      <span className="board__value">{formatScoreSheet(asResult(s))}</span>
                      <span className="board__meta">{s.moveCount} moves</span>
                    </Row>
                  ))}
                </ol>
              )}
            </section>
          </>
        )}

        {route === 'patterns' && (
          <>
            <ul className="board__list">
              {PATTERNS.map((pattern) => {
                const best = patternBest(solves, pattern.id);
                return (
                  <li key={pattern.id}>
                    <button className="menu__row" onClick={() => props.onStartPattern(pattern.id)}>
                      <span className="menu__label">{pattern.name.toUpperCase()}</span>
                      <span className="menu__blurb">{best ? `Best ${best.moveCount} moves` : 'Not yet solved'}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="board__note">Patterns keep a move record, not a time.</p>
          </>
        )}

        {route === 'settings' && (
          <>
            <section className="board">
              <h3 className="board__title">PALETTE</h3>
              <div className="choices">
                {Object.values(PALETTES).map((palette) => (
                  <button
                    key={palette.id}
                    className="choice"
                    data-selected={props.paletteId === palette.id}
                    onClick={() => props.onPalette(palette.id)}
                  >
                    <span className="choice__swatches">
                      {FACE_ORDER.map((face) => (
                        <span key={face} className="choice__swatch" style={{ background: palette.faces[face] }} />
                      ))}
                    </span>
                    {palette.name.toUpperCase()}
                  </button>
                ))}
              </div>
              {/* The colour word a cuber knows on top, this palette's own name beneath,
                  so a swap reads as the same cube retinted rather than a new one. */}
              <ul className="swatch-key">
                {FACE_ORDER.map((face) => (
                  <li key={face}>
                    <span
                      className="swatch-key__chip"
                      style={{ background: PALETTES[props.paletteId].faces[face] }}
                    />
                    <span className="swatch-key__word">{FACE_WORDS[face]}</span>
                    <span className="swatch-key__name">{PALETTES[props.paletteId].faceNames[face]}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="board">
              <h3 className="board__title">SOUND</h3>
              <button className="control control--wide" onClick={() => props.onSound(!props.soundOn)}>
                {props.soundOn ? 'SOUND ON' : 'SOUND OFF'}
              </button>
              <p className="board__note">
                There&rsquo;s no vibration on iOS Safari. Sound carries what touch would — every turn, tick, and
                refusal.
              </p>
            </section>

            <section className="board">
              <h3 className="board__title">TIMER MODE</h3>
              <ul className="board__list">
                {MODE_ROWS.map((row) => (
                  <li key={row.id}>
                    <button className="menu__row" data-selected={props.mode === row.id} onClick={() => props.onMode(row.id)}>
                      <span className="menu__label">
                        {row.label}
                        {props.mode === row.id && <span className="menu__check" aria-label="selected"> ✓</span>}
                      </span>
                      <span className="menu__blurb">{row.blurb}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <section className="board">
              <button className="menu__row" onClick={() => setRoute('about')}>
                <span className="menu__label">ABOUT</span>
                <span className="menu__blurb">What this app claims, and what it doesn&rsquo;t.</span>
              </button>
            </section>
          </>
        )}

        {/* The one place the full explanation lives. Every scope tag in the product --
            CFOP, NOT WCA, PRACTICE -- stays to one line because this exists, so it has
            to actually be reachable. */}
        {route === 'about' && (
          <section className="board about">
            {ABOUT_PARAGRAPHS.map((paragraph, i) => (
              <p key={i} className="about__p">
                {paragraph}
              </p>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
