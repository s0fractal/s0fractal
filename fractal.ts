#!/usr/bin/env -S deno run -A

import { parse } from "https://deno.land/std@0.224.0/flags/mod.ts";

const args = parse(Deno.args);
const cmd = args._[0];

switch (cmd) {
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

  default:
    console.log("🌀 Fractal CLI");
    console.log("Usage:");
    console.log("  fractal.ts install <angel>");
    console.log("  fractal.ts pulse");
    console.log("  fractal.ts angels");
    break;
}
