#!/bin/bash

TOKEN_NAME="fractal-agent-token"
WORKSPACE="s0fractal"

echo "🌱 Створення токена $TOKEN_NAME для воркспейсу $WORKSPACE..."
wmill tokens create "$TOKEN_NAME" --workspace "$WORKSPACE"