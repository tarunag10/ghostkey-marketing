import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "index.html",
  "about.html",
  "download.html",
  "privacy-policy.html",
  "support.html",
  "styles.css",
  "site.config.json",
  "docs/vercel-deployment.md",
  "docs/apple-resubmission-workflow.md",
  "ops/fastlane/Fastfile",
  "ops/fastlane/Appfile"
];

const requiredUrls = [
  "https://tarunag10.github.io/GhostKey/privacy-policy.html",
  "https://tarunag10.github.io/GhostKey/support.html"
];

const riskyPhrases = [
  "paywall bypass",
  "unlock paid content",
  "read without subscribing",
  "defeat login walls",
  "remove restrictions",
  "works everywhere",
  "guaranteed access"
];

let failed = false;

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    console.error(`Missing required file: ${file}`);
    failed = true;
  }
}

const copyFiles = requiredFiles.filter((file) => {
  return !file.endsWith("scripts/validate-site.mjs") && !file.endsWith("ops/fastlane/Fastfile");
});

const readableFiles = copyFiles
  .filter((file) => fs.existsSync(path.join(root, file)))
  .map((file) => [file, fs.readFileSync(path.join(root, file), "utf8")]);

const allText = readableFiles.map(([, text]) => text).join("\n");

for (const url of requiredUrls) {
  if (!allText.includes(url)) {
    console.error(`Missing required URL: ${url}`);
    failed = true;
  }
}

for (const phrase of riskyPhrases) {
  if (allText.toLowerCase().includes(phrase)) {
    console.error(`Risky Apple-review phrase found: ${phrase}`);
    failed = true;
  }
}

if (!allText.includes("GhostKey")) {
  console.error("Official app name GhostKey is missing.");
  failed = true;
}

if (failed) {
  process.exit(1);
}

console.log("GhostKey marketing site validation passed.");
