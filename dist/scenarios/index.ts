// Scenario registry.
//
// This app has no database, so a scenario is not a seed script — it is a named,
// deterministic fixture: a cube state, a move log, a solve history. Tests import
// them directly, and the dev app can load one via `?scenario=<name>` so a screen
// can be inspected in a known state without solving a cube by hand first.
export const scenarios = {} as const;

export type ScenarioName = keyof typeof scenarios;
