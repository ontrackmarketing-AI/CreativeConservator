#!/bin/bash
set -euo pipefail

# Only run in remote (Claude Code on the web) environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR/creative-conservator"

# Install npm dependencies
npm install

# Install Playwright browsers (non-fatal if CDN is unavailable; uses pre-cached browsers)
npx playwright install chromium || true

# Build the site so that `npm run preview` works for Playwright tests
npm run build
