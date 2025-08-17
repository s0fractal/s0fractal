import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";

const REPO_ROOT = path.resolve(__dirname, "..");

const FRACTAL_REPOS = [
  { name: "me", repo: "s0fractal/me" },
  { name: "i", repo: "s0fractal/i" },
  { name: "mi", repo: "s0fractal/mi" },
  { name: "iam", repo: "s0fractal/iam" },
  { name: "media", repo: "s0fractal/media" },
];

function cloneOrSubmodule({ name, repo }: { name: string; repo: string }) {
  const fullPath = path.join(REPO_ROOT, name);
  if (fs.existsSync(fullPath)) {
    console.log(`📁 ${name} already exists, skipping...`);
    return;
  }

  const useSubmodule = true; // ⬅ можна зробити динамічно через прапорець

  if (useSubmodule) {
    console.log(`➕ Adding submodule: ${repo}`);
    execSync(`git submodule add https://github.com/${repo}.git ${name}`, {
      cwd: REPO_ROOT,
      stdio: "inherit",
    });
  } else {
    console.log(`📥 Cloning: ${repo}`);
    execSync(`git clone https://github.com/${repo}.git ${name}`, {
      cwd: REPO_ROOT,
      stdio: "inherit",
    });
  }
}

function main() {
  for (const f of FRACTAL_REPOS) {
    cloneOrSubmodule(f);
  }

  console.log("✅ All fractal identities linked.");
}

main();