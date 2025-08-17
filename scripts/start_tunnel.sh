#!/bin/bash

# Назва тунелю (має відповідати ID, який бачиш у VS Code, якщо хочеш сталу адресу)
TUNNEL_NAME="m1examplecom"

# Запуск тунелю до локального code-server
echo "🚀 Запускаємо VS Code Tunnel: $TUNNEL_NAME"
code tunnel --name "$TUNNEL_NAME"