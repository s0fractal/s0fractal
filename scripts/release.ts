#!/usr/bin/env -S deno run -A

const [version] = Deno.args;
if (!version) {
    console.error(
        "❌ Provide version. Example: deno run -A scripts/release.ts v0.0.1",
    );
    Deno.exit(1);
}

const zip = `s0fractal-${version}.zip`;
const sha = `${zip}.sha256`;

console.log(`📦 Creating archive ${zip}`);
await new Deno.Command("git", {
    args: ["archive", "--format=zip", "-o", zip, "HEAD"],
}).output();

console.log("🔢 Calculating SHA256 checksum");
const shaOut = await new Deno.Command("shasum", {
    args: ["-a", "256", zip],
}).output();

await Deno.writeTextFile(sha, new TextDecoder().decode(shaOut.stdout));

console.log("✅ Done!");
console.log(
    `🔗 Upload manually to: https://github.com/s0fractal/s0fractal/releases/new?tag=${version}`,
);
console.log(`📝 Copy this to release body:\n`);

console.log(`
### ✨ Changes
- Initial public bootstrap for ${version}

### 🧪 Install
\`\`\`bash
/bin/bash -c "$(curl -fsSL https://s0fractal.me/install.sh)"
\`\`\`

### 📦 Checksum
\`\`\`
${new TextDecoder().decode(shaOut.stdout)}
\`\`\`
`);
