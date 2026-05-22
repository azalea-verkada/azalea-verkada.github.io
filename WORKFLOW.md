# Local → Staging → Prod Workflow

Three-tier publishing for interactive PM prototypes (canvases, IA audits, Storybooks).

```
┌─────────────────────────────────────────────────────────────────────────┐
│  LOCAL (dev)                                                            │
│  ~/Verkada_Code/z.external-context/<slug>/                              │
│  npm run dev  →  iterate in Cursor canvas or Vite                       │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │ git push
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  STAGING (your hub)                                                     │
│  Hub:  azalea-verkada.github.io          →  azalea-verkada.github.io    │
│  Apps: azalea-verkada/<slug>             →  ...github.io/<slug>/        │
│  Share staging URLs with design partners before team-wide publish       │
└───────────────────────────────┬─────────────────────────────────────────┘
                                │ PR / import when reviewed
                                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  PROD (team source of truth)                                            │
│  Hub:  Ankush-Rustagi.github.io          →  ankush-rustagi.github.io    │
│  Apps: Ankush-Rustagi/<slug>             →  ...github.io/<slug>/        │
│  Canonical portfolio for Core Command / EPD                           │
└─────────────────────────────────────────────────────────────────────────┘
```

## Folder map

| Layer | Path on disk | Git remote |
|-------|--------------|------------|
| Local hub | `z.external-context/azalea-verkada.github.io/` | `azalea-verkada/azalea-verkada.github.io` |
| Local prototype | `z.external-context/<slug>/` | `azalea-verkada/<slug>` |
| Prod hub (read/PR) | `z.external-context/Ankush-Rustagi.github.io/` | `Ankush-Rustagi/Ankush-Rustagi.github.io` (via fork or direct PR) |
| Docs / strategy | `docs-vibes/80-workspaces/azalea.phangsoa/` | `verkada/docs-vibes` |

## Step 1: Build locally

1. Start from a Cursor canvas or copy an existing prototype scaffold (`maps-2-0-editor-experience/` is the reference).
2. Set `base: '/<slug>/'` in `vite.config.ts` (required for GitHub Pages subpaths).
3. Add `.github/workflows/deploy.yml` (copy from `maps-2-0-nav-audit/` or this hub).
4. Run `npm run dev` and iterate.

## Step 2: Deploy to staging

### Prototype repo

```bash
cd ~/Verkada_Code/z.external-context/<slug>
git init   # if new
git remote add origin https://github.com/azalea-verkada/<slug>.git
gh repo create azalea-verkada/<slug> --public --source=. --remote=origin --push
```

Enable Pages: **Settings → Pages → Build and deployment → GitHub Actions**.

Live at: `https://azalea-verkada.github.io/<slug>/`

### Hub card

1. Edit `azalea-verkada.github.io/src/data/prototypes.ts` — add card with `href: '/<slug>/'`
2. Edit `src/data/site-updates.ts` — optional What's New banner
3. Push hub to `main`:

```bash
cd ~/Verkada_Code/z.external-context/azalea-verkada.github.io
git add -A && git commit -m "Add <slug> to staging hub" && git push
```

Live at: `https://azalea-verkada.github.io/`

## Step 3: Promote to prod

When staging is reviewed and ready for the team portfolio:

### A. Prototype repo → Ankush-Rustagi org

**Option 1 — Import (admin):** Ankush imports `azalea-verkada/<slug>` into `Ankush-Rustagi/<slug>` (same as [maps editor DEPLOY.md](../maps-2-0-editor-experience/DEPLOY.md)).

**Option 2 — PR from fork:** Push your branch to a fork of `Ankush-Rustagi/<slug>` and open a PR.

After import:
- Enable GitHub Pages on the prod repo
- Verify `https://ankush-rustagi.github.io/<slug>/`

### B. Hub card → prod hub

1. Open `z.external-context/Ankush-Rustagi.github.io/` (fork: `azalea-verkada/Ankush-Rustagi.github.io`)
2. Add matching entry to `src/data/prototypes.ts` (update `href` if prod path differs)
3. Add entry to `src/data/site-updates.ts`
4. Open PR to `Ankush-Rustagi/Ankush-Rustagi.github.io` main

### Promotion checklist

- [ ] Prototype builds cleanly (`npm run build`)
- [ ] Staging URL works on mobile
- [ ] `createdBy` / `lastModifiedBy` attribution is correct on hub card
- [ ] Prod repo exists under `Ankush-Rustagi/<slug>` with Pages enabled
- [ ] Hub PR merged on `Ankush-Rustagi.github.io`
- [ ] Log in `docs-vibes/80-workspaces/azalea.phangsoa/design-tests/publish-log.md` (optional)

## Quick commands

```bash
# Staging hub dev
cd ~/Verkada_Code/z.external-context/azalea-verkada.github.io && npm run dev

# Staging prototype dev
cd ~/Verkada_Code/z.external-context/maps-2-0-editor-experience && npm run dev

# Create new prototype repo on staging
gh repo create azalea-verkada/my-new-prototype --public --source=. --remote=origin --push
```

## Related docs

- Ankush prod hub: `z.external-context/Ankush-Rustagi.github.io/README.md`
- Maps editor deploy example: `z.external-context/maps-2-0-editor-experience/DEPLOY.md`
- PM workspace: `docs-vibes/80-workspaces/azalea.phangsoa/README.md`
- External context staging: `docs-vibes/ZERO_TO_CURSOR_IN_5_MINS.md`
