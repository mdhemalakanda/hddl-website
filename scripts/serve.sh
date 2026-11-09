#!/usr/bin/env bash
# Serve the built site/ directory locally on http://localhost:8135
# Usage: bash scripts/serve.sh   (run scripts/build.mjs first)
set -euo pipefail
cd "$(dirname "$0")/../site"
if [ ! -f index.html ]; then
  echo "site/ is empty — run: node scripts/build.mjs" >&2
  exit 1
fi
echo "Serving site/ at http://localhost:8135  (Ctrl+C to stop)"
exec python3 -m http.server 8135 --bind 127.0.0.1
