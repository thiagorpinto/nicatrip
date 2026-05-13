Status: done

# 01 — Project scaffold + deployable static map

## What to build

Set up the Vue 3 + Vite project with the full directory structure and tool config (ESLint, Vitest, Leaflet). Render an interactive Leaflet map centred on Nicaragua using hardcoded stub spot markers (plain blue circle `L.divIcon`). Include a minimal top bar with a "My Lists" button placeholder and a marker legend chip row. Wire a basic GitHub Actions workflow that deploys the Vite build to GitHub Pages on every push to `main`.

The goal is a live, reachable URL with a working map before any real data exists.

## Acceptance criteria

- [x] `npm run dev` serves the app without errors
- [x] `npm run build` produces a `dist/` artefact with no type or lint errors
- [x] Leaflet map renders centred on Nicaragua with at least 3 hardcoded stub spot markers visible
- [x] Top bar is present with a "My Lists" button (non-functional) and a legend row showing blue / amber / green colour chips with labels
- [x] GitHub Actions workflow runs on push to `main`, builds the site, and deploys to GitHub Pages
- [ ] Deployed site is reachable at the `github.io` URL

## Blocked by

None — can start immediately.
