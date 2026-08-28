import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnvConfig } from "@next/env";
import Stripe from "stripe";

let ensuredEnv = false;

/**
 * App root (`web/`, where `package.json` lives).
 * In production, this file is bundled under `.next/` — `import.meta.url` no longer resolves
 * to `src/lib`, so two `..` segments would point at `.next/` instead of `web/`.
 */
function webRootDir(): string {
  const cwd = process.cwd();
  const fromMeta = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
  if (fromMeta.includes(`${path.sep}.next`) || /[/\\]\.next([/\\]|$)/.test(fromMeta)) {
    return cwd;
  }
  const webNested = path.join(cwd, "web");
  if (fs.existsSync(path.join(webNested, "package.json"))) {
    return webNested;
  }
  if (fs.existsSync(path.join(fromMeta, "package.json"))) {
    return fromMeta;
  }
  return cwd;
}

/**
 * Next can run with `cwd` at the repo root while `.env.local` lives under `web/`.
 * `loadEnvConfig` from `@next/env` (same loader Next uses).
 */
function ensureEnvLoaded() {
  if (ensuredEnv) return;
  ensuredEnv = true;
  loadEnvConfig(process.cwd());
  const nestedWeb = path.join(process.cwd(), "web");
  if (path.resolve(nestedWeb) !== path.resolve(process.cwd())) {
    loadEnvConfig(nestedWeb);
  }
  // Always load `web/.env.local` when resolving from this file (Turbopack / monorepo cwd quirks).
  loadEnvConfig(webRootDir());
}

/** Last-resort: read `STRIPE_SECRET_KEY=` from disk when `process.env` is still empty. */
function parseStripeKeyFromEnvFile(filePath: string): string | undefined {
  try {
    if (!fs.existsSync(filePath)) return undefined;
    const text = fs.readFileSync(filePath, "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      if (trimmed.slice(0, eq).trim() !== "STRIPE_SECRET_KEY") continue;
      let v = trimmed.slice(eq + 1).trim();
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1);
      }
      return v || undefined;
    }
  } catch {
    /* ignore */
  }
  return undefined;
}

function readStripeKeyFromDisk(): string | undefined {
  const candidates = [
    path.join(webRootDir(), ".env.local"),
    path.join(webRootDir(), ".env"),
    path.join(process.cwd(), ".env.local"),
    path.join(process.cwd(), "web", ".env.local"),
  ];
  const seen = new Set<string>();
  for (const p of candidates) {
    const resolved = path.resolve(p);
    if (seen.has(resolved)) continue;
    seen.add(resolved);
    const v = parseStripeKeyFromEnvFile(resolved);
    if (v) return v;
  }
  return undefined;
}

/** Trim + strip accidental quotes from .env lines */
export function getStripeSecretKey(): string | undefined {
  const trimKey = (v: string) => v.trim().replace(/^['"]|['"]$/g, "");
  // Prefer platform env (e.g. Vercel) before touching dotenv files.
  let key = trimKey(process.env["STRIPE_SECRET_KEY"] ?? "");
  if (key) return key;

  ensureEnvLoaded();
  key = trimKey(process.env["STRIPE_SECRET_KEY"] ?? "");
  if (!key) {
    key = readStripeKeyFromDisk()?.trim().replace(/^['"]|['"]$/g, "") ?? "";
    if (key) {
      process.env["STRIPE_SECRET_KEY"] = key;
    }
  }
  return key.length > 0 ? key : undefined;
}

/** Same pattern as Casa do Sol (`casadosol/src/app/api/create-*-payment-link`). */
export function getStripe(): Stripe {
  const key = getStripeSecretKey();
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!key.startsWith("sk_")) {
    console.warn(
      "[stripe] STRIPE_SECRET_KEY should be a Secret key (starts with sk_test_ or sk_live_). Dashboard → Developers → API keys → Reveal test/live secret key.",
    );
  }
  return new Stripe(key);
}
