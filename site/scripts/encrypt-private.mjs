// Post-build step: password-protect the private pages.
//
// Two groups, two passwords:
//   • Dossier — every `publication: Self` writing page plus the interactive
//     game. Uses STATICRYPT_PASSWORD.
//   • Editor pitch — the /for-editors press kit and the unplaced
//     investment-case draft it links to. Uses EDITOR_PASSWORD (the one shared
//     widely with editors); falls back to STATICRYPT_PASSWORD if unset.
//
// Each page is replaced in the build output by a StatiCrypt-encrypted version:
// AES-256 at build, decrypted in-browser on the right password. The public host
// (GitHub Pages) only ever serves ciphertext, so the body, <head>/OG metadata
// and search previews are all gated.
//
// Passwords come from env vars (GitHub Actions secrets in CI). With no
// STATICRYPT_PASSWORD set — e.g. a local `npm run build` — this step is skipped
// so dev builds stay readable.

import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, existsSync, unlinkSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(here, "..");
const dist = path.join(siteRoot, "dist");
const writingDir = path.resolve(siteRoot, "..", "website-content", "writing");

const mainPw = process.env.STATICRYPT_PASSWORD;
if (!mainPw) {
  console.log(
    "[encrypt-private] STATICRYPT_PASSWORD not set — skipping encryption (dev build stays readable).",
  );
  process.exit(0);
}
const editorPw = process.env.EDITOR_PASSWORD || mainPw;

// Salt is public (it ships inside the page); a stable value just keeps the
// "remember me" session valid across deploys instead of resetting each build.
const SALT = process.env.STATICRYPT_SALT || "a1b2c3d4e5f60718293a4b5c6d7e8f90";

const distPath = (...p) => path.join(dist, ...p);

// Dossier: every writing entry marked `publication: Self`, plus the game.
const dossier = [];
for (const file of readdirSync(writingDir)) {
  if (!file.endsWith(".md")) continue;
  const fm = readFileSync(path.join(writingDir, file), "utf8").split(/^---\s*$/m)[1] || "";
  if (/^\s*publication:\s*Self\s*$/im.test(fm)) {
    dossier.push(distPath("writing", file.replace(/\.md$/, ""), "index.html"));
  }
}
dossier.push(distPath("read", "run-the-comms-stack", "index.html"));

// Editor pitch + the draft it links to (shared with editors under one password).
const editor = [
  distPath("for-editors", "index.html"),
  distPath("writing", "communications-investment-case", "index.html"),
];

const bin = path.join(siteRoot, "node_modules", ".bin", "staticrypt");
const template = path.join(here, "staticrypt-template.html"); // site-styled prompt

function encrypt(file, password) {
  if (!existsSync(file)) {
    console.warn(`[encrypt-private] skip (not built): ${path.relative(dist, file)}`);
    return false;
  }
  // Password is passed via env (STATICRYPT_PASSWORD), never argv.
  execFileSync(
    bin,
    [
      file,
      "-d", path.dirname(file), // overwrite the page in place
      "-s", SALT,
      "-c", "false",
      "--short",
      "--remember", "30",
      "--template", template,
      "--template-title", "This piece is private",
      "--template-instructions", "Enter the password to read it.",
      "--template-button", "Read",
      "--template-placeholder", "Password",
      "--template-error", "That password didn’t work — try again.",
    ],
    { stdio: ["ignore", "ignore", "inherit"], env: { ...process.env, STATICRYPT_PASSWORD: password } },
  );
  console.log(`[encrypt-private] protected ${path.relative(dist, file)}`);
  return true;
}

// Whole-site gate ("for now"): when GATE_ALL is set, every built page goes
// behind the main password, and the non-HTML files that would leak content
// (RSS, sitemap, llms.txt) are removed. Unset GATE_ALL to return to per-page
// gating below.
if (/^(1|true|yes)$/i.test(process.env.GATE_ALL || "")) {
  const htmlFiles = [];
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".html")) htmlFiles.push(p);
    }
  };
  walk(dist);
  let n = 0;
  for (const f of htmlFiles) n += encrypt(f, mainPw) ? 1 : 0;
  // Strip content-leaking non-HTML artifacts that StatiCrypt can't encrypt.
  for (const leak of ["rss.xml", "sitemap-index.xml", "sitemap-0.xml", "llms.txt"]) {
    const lp = distPath(leak);
    if (existsSync(lp)) { unlinkSync(lp); console.log(`[encrypt-private] removed ${leak}`); }
  }
  console.log(`[encrypt-private] GATE_ALL — whole site gated: ${n} page(s) behind the password.`);
  process.exit(0);
}

let count = 0;
for (const file of dossier) count += encrypt(file, mainPw) ? 1 : 0;
for (const file of editor) count += encrypt(file, editorPw) ? 1 : 0;
console.log(
  `[encrypt-private] done — ${count} page(s) protected` +
    (process.env.EDITOR_PASSWORD ? " (editor pages on a separate password)." : "."),
);
