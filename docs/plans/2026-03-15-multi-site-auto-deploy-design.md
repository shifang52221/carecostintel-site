# Multi-Site Auto Deploy Design

Date: 2026-03-15
Project: `f:\www\www7`

## Goal

Create a deployment pattern that lets this site, and future sites on the same server, auto-deploy after a push to GitHub without introducing a heavy new platform.

## Problem

The current production flow works, but it is still partly manual:

- push code to GitHub
- log into the server
- run `git pull`
- run `npm install`
- run `npm run build`

This is acceptable for one site, but it does not scale well once multiple static or light Node-based sites live on the same VPS. A one-off script per site would become repetitive and harder to maintain.

## Recommended Approach

Use GitHub Actions to trigger deployments and keep the actual deployment logic on the server.

The deployment system should be split into:

- one reusable server-side deploy script: `/root/deploy-site.sh`
- one config file per site in `/root/deploy-configs/`
- one lightweight GitHub Actions workflow per repo
- one dedicated SSH key for GitHub Actions to log into the server

This keeps the server in control of the deployment steps while still giving the user a `push-to-deploy` workflow.

## Alternatives Considered

### Option 1: Manual deploy only

Pros:

- simplest setup
- least moving parts
- easy to understand

Cons:

- still requires server login after every push
- easy to forget a step
- does not scale well across multiple sites

### Option 2: One custom deploy script per site

Pros:

- straightforward for the first site
- easy to explain

Cons:

- duplicates logic across sites
- grows messy as more projects are added
- future changes must be copied into multiple scripts

### Option 3: GitHub Actions plus one reusable server deployer

Pros:

- fully automatic after `push`
- deployment logic is centralized on the server
- future sites only need a config file and a thin workflow
- fits the current BT panel plus static-site hosting model

Cons:

- initial SSH key and GitHub Secrets setup is more involved than manual deploy

## Chosen Design

Use Option 3.

The final deployment chain should be:

1. Local code is pushed to `main`.
2. GitHub Actions detects the push.
3. The workflow uses `appleboy/ssh-action` to connect to the VPS.
4. The workflow runs `bash /root/deploy-site.sh <site-name>`.
5. The deploy script loads `/root/deploy-configs/<site-name>.conf`.
6. The deploy script runs pull, install, and build commands for that site.
7. BT serves the updated `dist` output because the website root already points at the built output directory.

## Server Architecture

The server-side deployment contract should be standardized:

- reusable deploy script: `/root/deploy-site.sh`
- config directory: `/root/deploy-configs/`
- one config per site, for example:
  - `/root/deploy-configs/carecostintel.conf`
  - `/root/deploy-configs/site2.conf`

Each config file should contain only the minimum required fields:

- `SITE_NAME`
- `PROJECT_DIR`
- `BRANCH`
- `INSTALL_CMD`
- `BUILD_CMD`

This keeps the first version small, predictable, and easy to expand later if a site needs different behavior.

## GitHub Architecture

Each repository should contain a lightweight workflow file at:

- `.github/workflows/deploy.yml`

The workflow should:

- trigger on pushes to `main`
- use `appleboy/ssh-action`
- pass deployment target details through GitHub Secrets
- call the reusable deploy script with the site key

Required GitHub Secrets:

- `SERVER_HOST`
- `SERVER_USER`
- `SERVER_PORT`
- `SERVER_SSH_KEY`

## Security Model

This design is safe enough for the current project stage because:

- the production site is static, which reduces attack surface
- the server continues to own deployment logic
- GitHub only needs SSH access for deployment
- a dedicated SSH key can be revoked without affecting the user's personal login setup

Short-term acceptable choice:

- deploy through `root` over SSH

Recommended later hardening:

- switch deployment to a dedicated server user
- limit SSH authentication to keys only
- keep only required firewall ports open
- store only deployment-specific credentials in GitHub Secrets

## Error Handling

The server deploy script should fail fast by using `set -e`.

That means:

- if SSH login fails, the workflow fails
- if `git pull` fails, deployment stops
- if dependency installation fails, deployment stops
- if the build fails, deployment stops

This prevents half-finished deployments and makes failures visible inside GitHub Actions.

## Testing And Verification

First-version verification should stay simple:

1. GitHub Actions must complete successfully.
2. The deploy script must stop on any failed command.
3. After deployment, manually verify the homepage and one key tool page such as the estimator.

## Rollback Strategy

Rollback should be Git-based, not server-hotfix based.

Preferred rollback flow:

1. identify the last stable commit
2. revert or reset locally in Git
3. push the corrected commit to `main`
4. let the automatic deployment run again

This keeps GitHub and the server aligned and avoids undocumented manual edits on the VPS.

## Success Criteria

The design is successful when:

- pushing to `main` automatically triggers deployment
- the VPS updates the correct site without manual SSH commands
- the deploy logic can be reused for future sites with only a new config file
- failures are visible in GitHub Actions logs
- rollback remains manageable through normal Git history
