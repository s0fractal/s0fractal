#!/bin/bash
TUNNEL_NAME="m1examplecom"

echo "🚀 Запускаємо VS Code Insiders Tunnel: $TUNNEL_NAME"

code-insiders tunnel --name $TUNNEL_NAME --accept-server-license-terms