import fs from "node:fs";
import path from "node:path";
import "./validate-site.mjs";

const root = process.cwd();
const outDir = path.join(root, "public");
const entries = [
  "index.html",
  "about.html",
  "download.html",
  "privacy-policy.html",
  "support.html",
  "styles.css",
  "site.config.json",
  "assets/ghostkey-icon.png",
  "assets/design-concept.png"
];

fs.rmSync(outDir, { recursive: true, force: true });

for (const entry of entries) {
  const from = path.join(root, entry);
  const to = path.join(outDir, entry);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

console.log("GhostKey static site built to public/.");
