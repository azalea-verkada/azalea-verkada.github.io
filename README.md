# azalea-verkada.github.io

**Staging hub** for Azalea Phangsoa's prototypes, canvases, and experiments.

| Environment | URL | Repo |
|-------------|-----|------|
| **Local (dev)** | `http://localhost:5173` | This folder + prototype folders in `z.external-context/` |
| **Staging** | https://azalea-verkada.github.io/ | `azalea-verkada/azalea-verkada.github.io` |
| **Prod (team)** | https://ankush-rustagi.github.io/ | `Ankush-Rustagi/Ankush-Rustagi.github.io` |

See [WORKFLOW.md](./WORKFLOW.md) for the full local → staging → prod pipeline.

## Stack

- Vite + React + TypeScript
- Tailwind v4 + shadcn-style components
- GitHub Pages via GitHub Actions on push to `main`

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Adding a prototype

1. Build the prototype in `~/Verkada_Code/z.external-context/<slug>/` (from Cursor canvas or scratch)
2. Push to `azalea-verkada/<slug>` with GitHub Pages enabled
3. Add a card to `src/data/prototypes.ts`
4. Add a banner entry to `src/data/site-updates.ts` (optional)
5. Push this hub to `main` → staging redeploys

When ready for team visibility, follow [WORKFLOW.md](./WORKFLOW.md#promote-to-prod).

## Field reference

See the Ankush hub README or `src/data/prototypes.ts` header comments for card field docs.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`.

One-time setup (already done if repo exists):

1. Repo **Settings → Pages → Source: GitHub Actions**
2. Push to `main`
3. First deploy takes 1–3 minutes
