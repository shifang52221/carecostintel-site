# Server Multi-Site Deploy Playbook

Date: 2026-03-15
Project: `f:\www\www7`

## Purpose

This playbook is the repeatable operating manual for deploying this site and future sites on the same VPS.

Use it as the standard reference for:

- current CareCostIntel deployment
- future static Astro sites
- future lightweight Node-based content sites using the same VPS model

## Current Working Pattern

The current production workflow is:

1. edit locally
2. commit and push to `main`
3. GitHub Actions triggers automatically
4. GitHub connects to the VPS over SSH
5. the VPS runs `bash /root/deploy-site.sh <site-key>`
6. the site pulls latest code and rebuilds
7. BT serves the updated build output

## Current Live Site

Current production site:

- domain: `https://www.carecostintel.com`
- server IP: `107.175.35.95`
- code directory: `/www/wwwroot/carecostintel-site`
- site key: `carecostintel`

## Server-Side Standard

Keep these paths stable across all future projects:

- shared deploy script: `/root/deploy-site.sh`
- shared config directory: `/root/deploy-configs/`
- per-site config: `/root/deploy-configs/<site-key>.conf`

Example:

- `/root/deploy-configs/carecostintel.conf`
- `/root/deploy-configs/site2.conf`
- `/root/deploy-configs/site3.conf`

Important:

- if a site depends on build-time variables such as `SITE_URL` or `PUBLIC_ALLOW_INDEXING`, export them in the per-site config or in the deploy invocation
- plain shell assignments without `export` do not reach `npm run build`

## Repository Standard

Each project repository should contain:

- `.github/workflows/deploy.yml`
- `scripts/deploy-site.sh`
- `deploy-configs/<site-key>.conf`

Why keep these files in the repo:

- deployment logic remains versioned
- future server rebuilds are easier
- new sites can copy a known-good pattern

## Current Secrets Standard

Each repo should define these GitHub repository secrets:

- `SERVER_HOST`
- `SERVER_USER`
- `SERVER_PORT`
- `SERVER_SSH_KEY`

Current values for this site:

- `SERVER_HOST=107.175.35.95`
- `SERVER_USER=root`
- `SERVER_PORT=22`
- `SERVER_SSH_KEY=<contents of /root/.ssh/github-actions-deploy>`

## Standard Per-Site Config

Each site config should follow this minimum structure:

```bash
SITE_NAME=carecostintel
PROJECT_DIR=/www/wwwroot/carecostintel-site
BRANCH=main
export SITE_URL="https://www.carecostintel.com"
export PUBLIC_ALLOW_INDEXING="true"
INSTALL_CMD="npm install"
BUILD_CMD="npm run build"
```

For the current site, keep production indexing values aligned in both places:

- repository workflow `.github/workflows/deploy.yml`
- server runtime config `/root/deploy-configs/carecostintel.conf`

## Standard Workflow

Each site repo should use a thin workflow that only triggers the VPS deployer:

```yaml
name: Deploy Site

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy on VPS
        uses: appleboy/ssh-action@v1.2.4
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          port: ${{ secrets.SERVER_PORT }}
          script: |
            bash /root/deploy-site.sh <site-key>
```

## Standard New-Site Checklist

When adding a new site to this server, follow this order:

1. create the GitHub repository
2. clone it to `/www/wwwroot/<repo-name>`
3. install dependencies on the server if needed
4. confirm the project builds on the server
5. create the BT site and point it to the build output
6. create `/root/deploy-configs/<site-key>.conf`
7. add the workflow file in the repo
8. add the 4 GitHub secrets
9. push a small test change
10. confirm the Actions run is green

If the live server still uses `/root/deploy-configs/<site-key>.conf` as the runtime source of truth, copy the updated tracked config from the repo to that server path after changing it.

## Standard Manual Fallback

If GitHub Actions is temporarily unavailable, manually redeploy from the server with:

```bash
bash /root/deploy-site.sh carecostintel
```

For another site:

```bash
bash /root/deploy-site.sh <site-key>
```

## Standard Rollback

Preferred rollback path:

```bash
git log --oneline -n 5
git revert <bad-commit-sha>
git push origin main
```

Avoid direct hotfix editing on the server unless access recovery or emergency debugging makes it necessary.

## Standard Verification

For any deploy verification, check:

1. latest GitHub Actions run is green
2. homepage loads
3. one core tool page loads
4. the expected text or feature change is visible

## Long-Term Notes

This pattern is intentionally simple:

- no paid BT deployment plugin required
- no webhook receiver service required
- no Docker platform required
- no extra deployment panel required

Use this as the default deployment model unless a future site truly needs SSR or long-running backend services.
