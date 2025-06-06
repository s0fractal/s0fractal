#!/usr/bin/env -S deno run -A
import { exists } from "https://deno.land/std@0.224.0/fs/mod.ts";
import { parse } from "https://deno.land/std@0.224.0/flags/mod.ts";
const cwd = new URL(".", import.meta.url).pathname;
Deno.chdir(cwd);
const args = parse(Deno.args);
const cmd = args._[0];

switch (cmd) {
  case "init": {
    const home = Deno.env.get("HOME");
    if (!home) {
      console.error("❌ Could not determine HOME directory.");
      Deno.exit(1);
    }

    const denoBin = `${home}/.deno/bin`;
    await Deno.mkdir(denoBin, { recursive: true });

    const cliPath = `${denoBin}/fractal`;
    const cliAlias = `${denoBin}/f`;

    const script = `#!/bin/bash
deno run -A ~/.s0fractal/fractal/fractal.ts "$@"`;

    if (!(await exists(cliPath))) {
      await Deno.writeTextFile(cliPath, script);
      await Deno.chmod(cliPath, 0o755);
      console.log("✅ CLI 'fractal' created");
    }

    if (!(await exists(cliAlias))) {
      await Deno.writeTextFile(cliAlias, script);
      await Deno.chmod(cliAlias, 0o755);
      console.log("✅ CLI alias 'f' created");
    }
    const localBin = `${home}/.local/bin`;
    await Deno.mkdir(localBin, { recursive: true });

    const cliLocal = `${localBin}/fractal`;
    const aliasLocal = `${localBin}/f`;

    await Deno.writeTextFile(cliLocal, script);
    await Deno.chmod(cliLocal, 0o755);
    await Deno.writeTextFile(aliasLocal, script);
    await Deno.chmod(aliasLocal, 0o755);

    console.log("🔗 Linked to ~/.local/bin (if in $PATH)");

    console.log("✅ Fractal CLI installed as 'fractal' and alias 'f'");
    console.log(
      "📘 You may need to restart your shell or run `source ~/.zshrc`",
    );
    Deno.exit(0);
  }
  case "install":
    if (args._[1]) {
      const name = args._[1];
      console.log(`📦 Installing angel: ${name}`);
      await Deno.mkdir(`./cellar/${name}`, { recursive: true });
      await Deno.writeTextFile(
        `./cellar/${name}/README.md`,
        `# Angel: ${name}\nInstalled via fractal`,
      );
    } else {
      console.log("❌ Please specify the name of the angel to install.");
    }
    break;

  case "pulse":
    console.log("💓 Fractal Pulse: System active.");
    break;

  case "angels":
    console.log("🧬 Available angels:");
    for await (const dir of Deno.readDir("./cellar")) {
      if (dir.isDirectory) console.log(` - ${dir.name}`);
    }
    break;
  case "doctor":
    console.log("🩺 Running Fractal Doctor...");

    const checks = [
      { name: "Deno", cmd: "deno --version" },
      { name: "Fractal CLI", cmd: "which fractal" },
      { name: "Fractal Alias", cmd: "which f" },
      { name: "Fractal Repo", cmd: "test -d ~/.s0fractal" },
    ];

    for (const check of checks) {
      try {
        const proc = check.cmd.startsWith("test")
          ? await Deno.run({ cmd: ["bash", "-c", check.cmd] }).status()
          : await Deno.run({ cmd: check.cmd.split(" "), stdout: "null" })
            .status();
        console.log(`✅ ${check.name}: ${proc.success ? "ok" : "missing"}`);
      } catch {
        console.log(`❌ ${check.name}: error`);
      }
    }

    break;
  default:
    console.log("🌀 Fractal CLI");
    console.log("Usage:");
    console.log("  fractal.ts install <angel>");
    console.log("  fractal.ts pulse");
    console.log("  fractal.ts angels");
    break;
}
