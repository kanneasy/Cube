# Setup — Quarter Turn

Accounts and keys this app needs for full functionality. The app is built to **run without them** — sample data and graceful "add your key" states — so you can use and demo it immediately, and add these when you're ready.

The build fills this in per project: each item lists what it's for, whether it's free, the link to get it, and the `.env` variable to set. Check items off as you complete them.

<!-- Example (the build replaces this with the real list):
- [ ] **YouVersion Platform API** — the real Verse of the Day. Free for non-commercial use. Register: https://platform.youversion.com → then add to `.env`: `YOUVERSION_APP_KEY=...`
-->

(Nothing required yet — intake/build will populate this.)

## Note on image generation
Builder can auto-generate this app's brand assets (app icon, OG image, in-app art) during the build. That runs through the `codex` CLI on your **ChatGPT allowance** — no API key and no per-asset billing, so there is nothing to add here for it. If codex is missing or signed out, Builder hands you a ready-to-paste image brief to run in ChatGPT yourself, and you drop the PNG in.

A billed OpenAI path exists as an alternative but is opt-in twice over (the provider named *and* the billing authorised), and its key lives once at the kit level in `~/builder/.env`, never per-app.
