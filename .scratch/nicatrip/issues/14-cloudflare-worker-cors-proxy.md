Status: ready-for-agent

# 14 — Cloudflare Worker CORS proxy (evaluate + build if needed)

## What to build

After issue #12 is deployed, test whether live Surfline forecast fetches from the `github.io` origin are blocked by Surfline's CORS policy.

**If not blocked:** close this issue as won't-fix. No changes required.

**If blocked:** implement a Cloudflare Worker on the free tier as a thin pass-through proxy:
- Worker URL: e.g. `https://nicatrip-surfline.{your-account}.workers.dev`
- Receives requests from the frontend, forwards them to `services.surfline.com` with the session cookie header intact, returns the response with permissive CORS headers
- Update `ForecastWidget` to point at the Worker URL instead of `services.surfline.com` directly
- Worker config and deploy script checked into the repo under `workers/`

The Cloudflare account and Worker deployment are manual steps (human does them once via the Cloudflare dashboard or `wrangler` CLI).

## Acceptance criteria

- [ ] **Evaluation done:** Surfline forecast fetch tested from the deployed `github.io` site
- [ ] **If no CORS block:** issue closed as won't-fix with a comment confirming the test result
- [ ] **If CORS blocked:** Cloudflare Worker deployed and reachable; `ForecastWidget` fetches through the Worker successfully; forecast data renders on the live site

## Blocked by

- [#12 — Forecast tab + Surfline cookie settings](12-forecast-tab-surfline-cookie.md)
