Status: ready-for-agent

# 05 — GitHub Actions CI/CD + Google Places API key setup

## What to build

Replace the push-only deploy workflow from issue #01 with the full production schedule. The workflow runs on two triggers:
1. **Weekly cron** — every Monday at 06:00 UTC (`0 6 * * 1`): run `data-builder` → `vite build` → deploy to GitHub Pages.
2. **Push to `main`** — run `vite build` only (skip data pipeline, use the already-committed `spots.json`) → deploy to GitHub Pages.

Steps for the weekly job:
1. Checkout repo
2. Install Node dependencies
3. Run `node scripts/pipeline/data-builder.js` (requires `GOOGLE_PLACES_API_KEY` secret)
4. Run `npm run build`
5. Deploy `dist/` to GitHub Pages via `peaceiris/actions-gh-pages`

The `GOOGLE_PLACES_API_KEY` secret must be added manually to the GitHub repo by the developer (**human step** — go to repo → Settings → Secrets and variables → Actions → New repository secret, name: `GOOGLE_PLACES_API_KEY`).

## Acceptance criteria

- [ ] Weekly cron job defined at `0 6 * * 1` in the workflow file
- [ ] Weekly job runs `data-builder` using `${{ secrets.GOOGLE_PLACES_API_KEY }}` as an env var
- [ ] Push-to-main job skips the data pipeline and only builds + deploys
- [ ] `peaceiris/actions-gh-pages` deploys `dist/` to the `gh-pages` branch
- [ ] **Human step complete:** `GOOGLE_PLACES_API_KEY` secret has been added to the GitHub repo secrets
- [ ] A manual workflow run (Actions tab → Run workflow) completes successfully and the live site is updated

## Blocked by

- [#01 — Project scaffold + deployable static map](01-project-scaffold-static-map.md)
- [#04 — Build pipeline: data-builder + spots.json output](04-build-pipeline-data-builder.md)
