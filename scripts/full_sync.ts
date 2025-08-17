// scripts/full_sync.ts
const { run } = Deno;
const decoder = new TextDecoder();

function log(msg: string) {
    console.log(`🔧 ${msg}`);
}

async function runCmd(cmd: string[], silent = false) {
    const p = run({
        cmd,
        stdout: silent ? "piped" : "inherit",
        stderr: "inherit",
    });
    const { success } = await p.status();
    if (!success) {
        log(`❌ Помилка при виконанні: ${cmd.join(" ")}`);
        Deno.exit(1);
    }
    if (silent) {
        const output = await p.output();
        return decoder.decode(output);
    }
    return "";
}

await runCmd(["git", "add", "-A"]);
log("Все додано у staging");

// Коміт меседж
const msgOutput = await runCmd([
    "deno",
    "run",
    "--allow-run",
    "--allow-write",
    "--allow-env",
    "--allow-read",
    "scripts/gen_commit_msg.ts",
], true);

const msg = msgOutput.match(/Generated: (.+)/)?.[1]?.trim();

if (!msg) {
    log("Не знайдено змін для коміту.");
    Deno.exit(0);
}

await runCmd(["git", "commit", "-m", msg]);
log("Коміт зроблено");

// Pull з rebase
await runCmd(["git", "pull", "--rebase"]);
log("Зміни з origin підтягнуто");

// Push
await runCmd(["git", "push"]);
log("🔁 Зміни успішно запушено");
