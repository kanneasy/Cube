# Quarter Turn

This is a Builder project, worked on from inside this directory (your cwd is this
project's root). The reusable kit — orchestrator, specialists, design library,
pitfalls KB, skills — lives at `~/builder/` and loads here as the `builder@builder`
project-scope plugin, declared in the tracked `.claude/settings.json`. It loads the
same way in a worktree of this project, which is the point: a worktree receives only
tracked files, so anything the kit needs has to be tracked or come from the plugin.

## Focus guard
- **This project only.** Do not read, search, or modify sibling projects under `../`.
- **cwd is the project root.** Specs in `src/`, code in `dist/`, knowledge/runs in
  `wiki/`. Kit tools are at `~/builder/bin/` (pass `.` as the project).
- **Spec first.** `src/` is the source of truth; change the spec before `dist/`.
- Significant decisions and each specialist run are recorded in `wiki/`.
