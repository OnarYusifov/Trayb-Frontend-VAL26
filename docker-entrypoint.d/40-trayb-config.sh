#!/bin/sh
set -eu

CONFIG_PATH="/usr/share/nginx/html/assets/config/config.json"
SPONSOR_IMAGE_URLS_JSON=${SPONSOR_IMAGE_URLS:-[\"/assets/misc/logo.webp\"]}

cat > "$CONFIG_PATH" <<EOF
{
  "brandName": "${BRAND_NAME:-Trayb}",
  "brandLogoUrl": "${BRAND_LOGO_URL:-/assets/misc/icon.webp}",
  "serverEndpoint": "${SERVER_ENDPOINT:-https://data.trayb.az}",
  "overlayAccessToken": "${OVERLAY_ACCESS_TOKEN:-}",
  "redirectUrl": "${REDIRECT_URL:-https://trayb.az}",
  "sponsorImageUrls": ${SPONSOR_IMAGE_URLS_JSON},
  "sponsorImageRotateSpeed": ${SPONSOR_IMAGE_ROTATE_SPEED:-5000},
  "attackerColorPrimary": "${ATTACKER_COLOR_PRIMARY:-#fd4756}",
  "attackerColorSecondary": "${ATTACKER_COLOR_SECONDARY:-#ff4557}",
  "attackerColorShieldCurrency": "${ATTACKER_COLOR_SHIELD_CURRENCY:-#ff838f}",
  "defenderColorPrimary": "${DEFENDER_COLOR_PRIMARY:-#21fec5}",
  "defenderColorSecondary": "${DEFENDER_COLOR_SECONDARY:-#61eab6}",
  "defenderColorShieldCurrency": "${DEFENDER_COLOR_SHIELD_CURRENCY:-#61eab6}",
  "mapbanEndpoint": "${MAPBAN_ENDPOINT:-https://mapban-socket.trayb.az}",
  "statsEndpoint": "${STATS_ENDPOINT:-https://stats.trayb.az}",
  "extrasEndpoint": "${EXTRAS_ENDPOINT:-https://extras.trayb.az}"
}
EOF
