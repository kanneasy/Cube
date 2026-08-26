import { run as hello } from './hello';

// The scenario registry. The build skill adds new scenarios here so they can be
// run by name via `npm run scenario <name>`.
export const scenarios = { hello };
