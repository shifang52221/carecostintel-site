#!/bin/bash
set -euo pipefail

SITE_KEY="${1:-}"
CONFIG_DIR="${DEPLOY_CONFIG_DIR:-/root/deploy-configs}"

if [ -z "$SITE_KEY" ]; then
  echo "Usage: bash /root/deploy-site.sh <site-key>"
  exit 1
fi

CONFIG_FILE="${CONFIG_DIR}/${SITE_KEY}.conf"

if [ ! -f "$CONFIG_FILE" ]; then
  echo "Config file not found: $CONFIG_FILE"
  exit 1
fi

source "$CONFIG_FILE"

require_var() {
  local name="$1"
  local value="${!name:-}"

  if [ -z "$value" ]; then
    echo "Missing required config value: $name"
    exit 1
  fi
}

require_var SITE_NAME
require_var PROJECT_DIR
require_var BRANCH

if [ ! -d "$PROJECT_DIR" ]; then
  echo "Project directory not found: $PROJECT_DIR"
  exit 1
fi

cd "$PROJECT_DIR"

echo "Deploying ${SITE_NAME} from branch ${BRANCH}"

git fetch origin
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

if [ -n "${INSTALL_CMD:-}" ]; then
  echo "Running install command..."
  eval "$INSTALL_CMD"
fi

if [ -n "${BUILD_CMD:-}" ]; then
  echo "Running build command..."
  eval "$BUILD_CMD"
fi

echo "Deployment complete for ${SITE_NAME}"
