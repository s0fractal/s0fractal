#!/usr/bin/env -S deno run -A

import { basename } from "https://deno.land/std@0.224.0/path/mod.ts";

const home = Deno.env.get("HOME");
const files = [".bashrc", ".zshrc", ".gitconfig", ".vimrc"];

for (const file of files) {
  const path = `${home}/${file}`;
  try {
    const stat = await Deno.lstat(path);
    const isLink = stat.isSymlink;
    console.log(`${file}: ${isLink ? "🔗 symlink" : "📄 file"}`);
  } catch {
    console.log(`${file}: ❌ missing`);
  }
}
