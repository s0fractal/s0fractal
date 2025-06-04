// scripts/full_sync.ts
const { run } = Deno;
const encoder = new TextEncoder();

function log(msg: string) {
    console.log(`🔧 ${msg}`);
}

// 1. git add -A
await run({ cmd: ["git", "add", "-A"] }).status();
log("Все додано у staging");

// 2. Генерація коміт-меседжу
const p = run({
    cmd: [
        "deno",
        "run",
        "--allow-run",
        "--allow-write",
        "--allow-env",
        "--allow-read",
        "scripts/gen_commit_msg.ts",
    ],
    stdout: "piped",
});
const output = await p.output();
const msg = new TextDecoder().decode(output).match(/Generated: (.+)/)?.[1]
    ?.trim();

if (!msg) {
    log("Не знайдено змін для коміту.");
    Deno.exit(0);
}

// 3. git commit -m
await run({ cmd: ["git", "commit", "-m", msg] }).status();
log("Коміт зроблено");

// 4. git fetch (опціонально)
await run({ cmd: ["git", "fetch"] }).status();

// 5. git push
await run({ cmd: ["git", "push"] }).status();
log("Зміни запушено 🔄");
