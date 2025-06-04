# Fractal Agent (s0fractal)

🌱 Прототип автономного агента з Supabase, Windmill і GPT.

## 📦 Структура
- `agent/` — логіка роботи агента
- `supabase/` — SQL-схема для таблиць
- `scripts/` — інтеграції та синхронізація
- `Dockerfile` — контейнер для запуску

## ⚙️ Налаштування
Створи `.env` файл:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_or_service_key
GPT_KEY=...
WINDMILL_TOKEN=...
```

## 🚀 Запуск
```bash
deno run --allow-net --allow-read agent/index.ts
```

## 📡 TODO
- [ ] Підключення до Supabase
- [ ] Синхронізація presence.json
- [ ] Push у GitHub через API
- [ ] Запуск через Windmill

---
Починаємо з простого ядра — розширимо пізніше 🌌
