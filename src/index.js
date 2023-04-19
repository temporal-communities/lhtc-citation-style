import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { createHash } from "crypto"

const LOCALES = ["en", "de"]
const LOCALE_PLACEHOLDER = "{{LOCALE}}"
const TIMESTAMP_PLACEHOLDER = "{{TIMESTAMP}}"

const __filename = fileURLToPath(import.meta.url)
const src = path.dirname(__filename)
const projectRoot = path.join(src, "..")
const dist = path.join(projectRoot, "dist")

const srcFile = fs.readFileSync(path.join(src, "lhtc.csl"), "utf8")
// Get hash of srcFile to avoid unnecessary rebuilds
const hash = createHash("sha256").update(srcFile).digest("hex")

// Load JSON cache .cache/cache.json
const cacheFile = path.join(projectRoot, ".cache", "cache.json")
let cache
try {
  // Check if directory exists
  if (!fs.existsSync(path.dirname(cacheFile))) {
    fs.mkdirSync(path.dirname(cacheFile))
  }

  // Read cache file
  const cacheString = fs.readFileSync(cacheFile, "utf8")
  cache = JSON.parse(cacheString) || {}
} catch (e) {
  // If ENOENT (file not found), create empty cache
  if (e.code !== "ENOENT") {
    throw e
  }
  cache = {}
}

// Check if hash is the same
// If yes, skip
if (cache["lhtc.csl"] === hash) {
  console.log("No changes detected. Skipping build.")
  process.exit(0)
}

// If not, rebuild
for (const locale of LOCALES) {
  const replaced = srcFile
    .replaceAll(LOCALE_PLACEHOLDER, locale)
    .replaceAll(TIMESTAMP_PLACEHOLDER, new Date().toISOString())

  fs.writeFileSync(path.join(dist, `lhtc-${locale}.csl`), replaced)
}

// Write hash to cache
cache["lhtc.csl"] = hash
fs.writeFileSync(cacheFile, JSON.stringify(cache))
