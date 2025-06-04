# mutation-lab v2

Це CLI-ядро для побудови агентної взаємодії між локальними машинами, серверами і процесами.

## Команди

- `just install:ssh-core` — генерує основний ключ `mutation_core`
- `just link:ubuntu IP=192.168.1.100` — копіює ключ на сервер Ubuntu
- `just agent:ping` — перевірка зʼєднання з агентом
- `just init:mutation-network` — зберігає конфігурацію агентів

## agent-config.json

JSON-файл, що описує роль кожної системи в мережі.