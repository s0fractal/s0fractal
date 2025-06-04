#!/bin/bash
mkdir -p logs

echo "=== brew list ===" > logs/system_audit.txt
brew list >> logs/system_audit.txt

echo "\n=== brew services list ===" >> logs/system_audit.txt
brew services list >> logs/system_audit.txt

echo "\n=== launchctl list ===" >> logs/system_audit.txt
launchctl list >> logs/system_audit.txt

echo "\n=== login items ===" >> logs/system_audit.txt
osascript -e 'tell application "System Events" to get the name of every login item' >> logs/system_audit.txt

echo "\n=== crontab -l ===" >> logs/system_audit.txt
crontab -l >> logs/system_audit.txt 2>/dev/null

echo "\n=== npm list -g --depth=0 ===" >> logs/system_audit.txt
npm list -g --depth=0 >> logs/system_audit.txt 2>/dev/null

echo "\n=== pnpm list -g --depth=0 ===" >> logs/system_audit.txt
pnpm list -g --depth=0 >> logs/system_audit.txt 2>/dev/null

echo "\n=== deno info ===" >> logs/system_audit.txt
deno info >> logs/system_audit.txt 2>/dev/null

echo "\n=== pip list ===" >> logs/system_audit.txt
pip list >> logs/system_audit.txt 2>/dev/null