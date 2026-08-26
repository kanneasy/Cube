---
name: Your Records, Any Phone
type: roadmap
status: not-started
description: Your solve history follows you to a new phone, no account required.
effort: medium
---

**As** a cuber who solves on more than one device **I want** my records and history to
follow me **So that** switching phones doesn't erase years of solve history.

Everything before this lane lives in IndexedDB on one phone, which is exactly right for
a single-player app and exactly wrong the day the user gets a new phone. This is the
foundation the rest of the lane needs: a lightweight, account-light way to carry solve
history across devices, without turning this into a login-and-password product.

## What it looks like
- A device-linking flow that doesn't require an email/password account — a code or
  link between two devices the user already owns
- History, records, and settings sync once linked; no ongoing manual export or import
- Fully optional: an unlinked phone works exactly as v1 always has, with zero account of any kind

## Key details
- This is the one item on the entire roadmap that requires standing up a real backend,
  breaking v1's zero-server, zero-cost architecture — a genuine strategic pivot, not a
  small add
- Should be scoped with architecture before building; the "no server" decision in v1
  was deliberate, and reversing it for even one feature has real cost and maintenance
  implications worth weighing openly with the user first

~~~
Implementation notes: architecture scoping mandatory before any code — this is the
heaviest item on the roadmap by nature, not just by effort label. Consider the
lightest possible backend (a small sync service) rather than reaching for the house
full-stack convention by default, since this app's core job doesn't otherwise need one.
~~~
