import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const LOCALES = ["en", "de"]
const LOCALE_PLACEHOLDER = "{{LOCALE}}"
const TIMESTAMP_PLACEHOLDER = "{{TIMESTAMP}}"

const __filename = fileURLToPath(import.meta.url)
const src = path.dirname(__filename)
const projectRoot = path.join(src, "..")
const dist = path.join(projectRoot, "dist")

for (const locale of LOCALES) {
  const file = fs.readFileSync(path.join(src, "lhtc.csl"), "utf8")

  const replaced = file
    .replaceAll(LOCALE_PLACEHOLDER, locale)
    .replaceAll(TIMESTAMP_PLACEHOLDER, new Date().toISOString().substring(0, 10))

  fs.writeFileSync(path.join(dist, `lhtc-${locale}.csl`), replaced)
}
