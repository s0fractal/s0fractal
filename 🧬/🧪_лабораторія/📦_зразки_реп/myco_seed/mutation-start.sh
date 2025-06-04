#!/bin/bash

echo "🌱 Запускаю агента та wake-тригер..."
deno run --allow-read --allow-write --allow-run agent.ts & 
AGENT_PID=$!

sleep 1

deno run --allow-read --allow-write bio_trigger.ts & 
TRIGGER_PID=$!

sleep 1

echo "📡 Імітую wake-сигнал..."
touch wake.signal

echo "✅ Всі процеси запущені. Агент PID: $AGENT_PID, Wake PID: $TRIGGER_PID"
