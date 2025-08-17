import { join } from "https://deno.land/std@0.224.0/path/mod.ts";

function getDisplayName(dirName: string): string {
  const match =
    /^([\p{Emoji_Presentation}|\p{Extended_Pictographic}]{1,2})(.*)$/u.exec(
      dirName,
    );
  return match
    ? `[${match[1]}${match[2]}](${dirName}/README.md)`
    : `[${dirName}](${dirName}/README.md)`;
}

function generateIndex(dir: string, depth = 0): string {
  const entries = Array.from(Deno.readDirSync(dir));
  const subDirs = entries.filter((e) => e.isDirectory);
  const hasReadme = entries.some((e) => e.name === "README.md");

  let result = "";
  if (hasReadme) {
    const indent = "  ".repeat(depth);
    result += `${indent}- ${getDisplayName(dir)}\n`;
  }

  for (const sub of subDirs) {
    const fullPath = join(dir, sub.name);
    if (!fullPath.includes("node_modules") && !fullPath.startsWith(".")) {
      result += generateIndex(fullPath, depth + 1);
    }
  }

  return result;
}

function run() {
  const output = `# 🧬 S0FRACTAL INDEX\n\n${generateIndex(".")}`;
  Deno.writeTextFileSync("README.md", output);
  console.log("✅ Індекс згенеровано.");
}

run();
