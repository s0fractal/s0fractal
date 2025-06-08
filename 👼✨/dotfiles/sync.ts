#!/usr/bin/env -S deno run -A

import { expandGlob } from "https://deno.land/std@0.224.0/fs/mod.ts";
import { resolve, basename } from "https://deno.land/std@0.224.0/path/mod.ts";

const home = Deno.env.get("HOME");
if (!home) {
  console.error("❌ HOME environment variable not found.");
  Deno.exit(1);
}

const dotfileDir = `${home}/.s0fractal/angels/dotfiles/files`;

for await (const file of expandGlob(`${dotfileDir}/.*`, { includeFiles: true })) {
  const target = `${home}/${basename(file.path)}`;
  try {
    await Deno.remove(target);
  } catch (_) {}

  await Deno.symlink(resolve(file.path), target);
  console.log(`🔗 Linked ${file.path} → ${target}`);
}
