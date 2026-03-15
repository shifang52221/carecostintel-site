# Multi-Site Auto Deploy Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a reusable deployment setup where pushes to `main` automatically deploy the correct site on the VPS through one shared server-side deploy script plus one per-site config file.

**Architecture:** GitHub Actions will act only as the trigger and remote executor. The VPS will own the real deployment logic through `/root/deploy-site.sh`, which loads `/root/deploy-configs/<site>.conf` and runs the site's pull, install, and build steps. This keeps the production flow centralized on the server and reusable across multiple sites.

**Tech Stack:** GitHub Actions, `appleboy/ssh-action`, SSH key auth, Git, Node.js, npm, Astro, BT panel static hosting

---

### Task 1: Create the shared VPS deploy script

**Files:**
- Create: `/root/deploy-site.sh`

**Step 1: Write the deploy script on the server**

Create `/root/deploy-site.sh` with this content:

```bash
#!/bin/bash
set -e

SITE_KEY="$1"

if [ -z "$SITE_KEY" ]; then
  echo "Usage: bash /root/deploy-site.sh <site-key>"
  exit 1
fi

CONFIG_FILE="/root/deploy-configs/${SITE_KEY}.conf"

if [ ! -f "$CONFIG_FILE" ]; then
  echo "Config file not found: $CONFIG_FILE"
  exit 1
fi

source "$CONFIG_FILE"

if [ -z "$PROJECT_DIR" ] || [ -z "$BRANCH" ]; then
  echo "Missing required config values in $CONFIG_FILE"
  exit 1
fi

if [ ! -d "$PROJECT_DIR" ]; then
  echo "Project directory not found: $PROJECT_DIR"
  exit 1
fi

cd "$PROJECT_DIR"

echo "Deploying $SITE_NAME from branch $BRANCH"

git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"

if [ -n "$INSTALL_CMD" ]; then
  echo "Running install command..."
  eval "$INSTALL_CMD"
fi

if [ -n "$BUILD_CMD" ]; then
  echo "Running build command..."
  eval "$BUILD_CMD"
fi

echo "Deployment complete for $SITE_NAME"
```

**Step 2: Make the script executable**

Run:

```bash
chmod +x /root/deploy-site.sh
```

Expected:

- no error output
- `/root/deploy-site.sh` becomes executable

**Step 3: Verify the usage guard works**

Run:

```bash
bash /root/deploy-site.sh
```

Expected:

- exits non-zero
- prints `Usage: bash /root/deploy-site.sh <site-key>`

### Task 2: Add the first site config for CareCostIntel

**Files:**
- Create: `/root/deploy-configs/carecostintel.conf`

**Step 1: Create the config directory**

Run:

```bash
mkdir -p /root/deploy-configs
```

Expected:

- directory exists at `/root/deploy-configs`

**Step 2: Create the first site config**

Create `/root/deploy-configs/carecostintel.conf` with this content:

```bash
SITE_NAME=carecostintel
PROJECT_DIR=/www/wwwroot/carecostintel-site
BRANCH=main
INSTALL_CMD="npm install"
BUILD_CMD="npm run build"
```

**Step 3: Dry-run the deploy command manually**

Run:

```bash
bash /root/deploy-site.sh carecostintel
```

Expected:

- script finds the config file
- enters `/www/wwwroot/carecostintel-site`
- completes `git pull origin main`
- completes `npm install`
- completes `npm run build`
- prints `Deployment complete for carecostintel`

### Task 3: Create a dedicated GitHub Actions SSH key

**Files:**
- Create: `/root/.ssh/github-actions-deploy`
- Create: `/root/.ssh/github-actions-deploy.pub`
- Modify: `/root/.ssh/authorized_keys`

**Step 1: Generate the deploy key on the server**

Run:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f /root/.ssh/github-actions-deploy
```

When prompted for a passphrase:

- leave it empty for this machine-to-machine deploy key

Expected:

- private key created at `/root/.ssh/github-actions-deploy`
- public key created at `/root/.ssh/github-actions-deploy.pub`

**Step 2: Install the public key for SSH login**

Run:

```bash
cat /root/.ssh/github-actions-deploy.pub >> /root/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys
```

Expected:

- no error output
- the public key is present in `/root/.ssh/authorized_keys`

**Step 3: Copy the private key for GitHub Secrets**

Run:

```bash
cat /root/.ssh/github-actions-deploy
```

Expected:

- full private key text beginning with `-----BEGIN OPENSSH PRIVATE KEY-----`

Use that exact private key text as the value for the GitHub repository secret `SERVER_SSH_KEY`.

### Task 4: Configure GitHub repository secrets

**Files:**
- External UI: `https://github.com/shifang52221/carecostintel-site/settings/secrets/actions`

**Step 1: Open the repository Actions secrets page**

Open:

```text
https://github.com/shifang52221/carecostintel-site/settings/secrets/actions
```

Expected:

- Actions secrets management UI is visible

**Step 2: Add the required secrets**

Create these secrets:

- `SERVER_HOST` = `107.175.35.95`
- `SERVER_USER` = `root`
- `SERVER_PORT` = `22`
- `SERVER_SSH_KEY` = contents of `/root/.ssh/github-actions-deploy`

Expected:

- four repository secrets are listed

### Task 5: Add the GitHub Actions workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: Create the workflow file**

Create `.github/workflows/deploy.yml` with this content:

```yaml
name: Deploy CareCostIntel

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Deploy on VPS
        uses: appleboy/ssh-action@v1.2.2
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          port: ${{ secrets.SERVER_PORT }}
          script: |
            bash /root/deploy-site.sh carecostintel
```

**Step 2: Commit and push the workflow**

Run:

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add automatic deploy workflow"
git push origin main
```

Expected:

- commit succeeds
- push succeeds
- GitHub Actions starts a workflow run for the new commit

### Task 6: Validate the first end-to-end deployment

**Files:**
- Verify existing files only

**Step 1: Watch the GitHub Actions run**

Open:

```text
https://github.com/shifang52221/carecostintel-site/actions
```

Expected:

- latest workflow run starts automatically
- the `Deploy on VPS` step succeeds

**Step 2: Confirm the server script still works outside Actions**

Run on the VPS:

```bash
bash /root/deploy-site.sh carecostintel
```

Expected:

- the same deployment completes manually

**Step 3: Verify the live website**

Open and check:

- `https://www.carecostintel.com/`
- `https://www.carecostintel.com/estimator/`

Expected:

- homepage loads
- estimator page loads
- no missing assets or broken styling

### Task 7: Document the reusable multi-site pattern

**Files:**
- Modify: `README.md`

**Step 1: Add a short deployment section**

Document:

- that production deploys from pushes to `main`
- that the server uses `/root/deploy-site.sh <site-key>`
- that each additional site needs its own `/root/deploy-configs/<site-key>.conf`

**Step 2: Commit the documentation update**

Run:

```bash
git add README.md
git commit -m "docs: add deployment workflow notes"
git push origin main
```

Expected:

- documentation commit succeeds
- the deployment workflow runs again successfully

### Task 8: Define the rollback playbook

**Files:**
- Modify: `README.md`

**Step 1: Add rollback instructions**

Document this production rollback flow:

```bash
git log --oneline -n 5
git revert <bad-commit-sha>
git push origin main
```

Document that the preferred rollback path is:

- fix forward if the issue is small
- revert and redeploy if the issue is urgent
- avoid editing production code directly on the server

**Step 2: Commit the rollback note**

Run:

```bash
git add README.md
git commit -m "docs: add deploy rollback notes"
git push origin main
```

Expected:

- documentation commit succeeds
- workflow runs successfully again
