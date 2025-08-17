#!/bin/bash
echo "🔒 Вимикаємо login items..."
osascript -e 'tell application "System Events" to delete every login item'