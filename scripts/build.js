// Copies the website files into /public — the folder Vercel publishes.
// Runs on Vercel after scripts/check.js passes (see vercel.json → buildCommand).
const fs = require("fs");
const path = require("path");
 
const root = path.join(__dirname, "..");
const out = path.join(root, "public");
const SKIP = new Set(["api", "scripts", "public", "node_modules", ".git", ".github", ".vercel", "README.md", "package.json", "package-lock.json", "vercel.json", ".gitignore"]);
 
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out);
let n = 0;
for (const name of fs.readdirSync(root)) {
  if (SKIP.has(name) || name.startsWith(".")) continue;
  fs.cpSync(path.join(root, name), path.join(out, name), { recursive: true });
  n++;
}
if (!fs.existsSync(path.join(out, "index.html"))) { console.error("✗ index.html مش موجود"); process.exit(1); }
console.log(`✓ تم تجهيز ${n} ملف/فولدر للنشر في public/`);
 