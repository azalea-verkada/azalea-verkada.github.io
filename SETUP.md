# One-time GitHub setup

The repo is live at https://github.com/azalea-verkada/azalea-verkada.github.io but **GitHub Pages is not active yet** until you complete these steps.

## 1. Push the deploy workflow

The initial push omitted `.github/workflows/deploy.yml` because the OAuth token lacked the `workflow` scope.

```bash
# Refresh GitHub CLI auth with workflow scope
gh auth refresh -s workflow

# Push the workflow
cd ~/Verkada_Code/z.external-context/azalea-verkada.github.io
git push origin main
```

If push still fails, add the workflow manually in GitHub:

1. Open https://github.com/azalea-verkada/azalea-verkada.github.io
2. **Add file → Create new file** → path: `.github/workflows/deploy.yml`
3. Paste contents from the local file in this repo
4. Commit to `main`

## 2. Enable GitHub Pages

1. Repo **Settings → Pages**
2. **Build and deployment → Source:** GitHub Actions
3. Wait 1–3 minutes for first deploy

Staging URL: https://azalea-verkada.github.io/

## 3. Verify prototype Pages

Ensure these repos also have Pages enabled (GitHub Actions):

| Repo | Staging URL |
|------|-------------|
| `azalea-verkada/maps-2-0-editor-experience` | https://azalea-verkada.github.io/maps-2-0-editor-experience/ |
| `azalea-verkada/maps-2-0-nav-audit` | https://azalea-verkada.github.io/maps-2-0-nav-audit/ |

For each: **Settings → Pages → GitHub Actions**

## 4. Promote to prod

See [WORKFLOW.md](./WORKFLOW.md).
