// Post-build step: password-protect the self-published articles.
//
// Each `publication: Self` writing page (plus the interactive game) is replaced
// in the build output by a StatiCrypt-encrypted version: the HTML is AES-256
// encrypted at build time and decrypted in the browser once the visitor enters
// the shared password. The public host (GitHub Pages) only ever serves
// ciphertext, so the article body, its <head>/OG metadata, and search-engine
// previews are all gated.
//
// The password comes from the STATICRYPT_PASSWORD env var (a GitHub Actions
// secret in CI). With no password set — e.g. a local `npm run build` — this
// step is skipped so dev builds stay readable.

import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(here, "..");
const dist = path.join(siteRoot, "dist");
const writingDir = path.resolve(siteRoot, "..", "website-content", "writing");

const password = process.env.STATICRYPT_PASSWORD;
if (!password) {
  console.log(
    "[encrypt-private] STATICRYPT_PASSWORD not set — skipping encryption (dev build stays readable).",
  );
  process.exit(0);
}

// Salt is public (it ships inside the page); a stable value just keeps the
// "remember me" session valid across deploys instead of resetting each build.
const SALT = process.env.STATICRYPT_SALT || "a1b2c3d4e5f60718293a4b5c6d7e8f90";

// Every writing entry marked `publication: Self` is self-published → gate it.
const targets = [];
for (const file of readdirSync(writingDir)) {
  if (!file.endsWith(".md")) continue;
  const fm = readFileSync(path.join(writingDir, file), "utf8").split(/^---\s*$/m)[1] || "";
  if (/^\s*publication:\s*Self\s*$/im.test(fm)) {
    targets.push(path.join(dist, "writing", file.replace(/\.md$/, ""), "index.html"));
  }
}
// The interactive companion is self-published too.
targets.push(path.join(dist, "read", "run-the-comms-stack", "index.html"));

const bin = path.join(siteRoot, "node_modules", ".bin", "staticrypt");
const template = path.join(here, "staticrypt-template.html"); // site-styled prompt
let count = 0;
for (const file of targets) {
  if (!existsSync(file)) {
    console.warn(`[encrypt-private] skip (not built): ${path.relative(dist, file)}`);
    continue;
  }
  // Password is passed via the inherited STATICRYPT_PASSWORD env, never argv.
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
    { stdio: ["ignore", "ignore", "inherit"] },
  );
  console.log(`[encrypt-private] protected ${path.relative(dist, file)}`);
  count++;
}
console.log(`[encrypt-private] done — ${count} page(s) protected.`);
