import { equal } from "assert"
import Cite from "citation-js"
import { readFileSync } from "fs"

// Load LHTC style
const templateName = "lhtc"
const template = readFileSync("./dist/lhtc-en.csl", "utf8")

const config = Cite.plugins.config.get("@csl")
config.templates.add(templateName, template)

// Load test data
// Relative to script directory
const data = readFileSync("./test/export.json", "utf8")
// Access data.items and re-stringify (necessary for Zotero CSL API)
const dataString = JSON.stringify(JSON.parse(data).items)

const cite = new Cite(dataString)
const bib = cite
  .format("bibliography", {
    format: "html",
    template: templateName,
    lang: "en",
    asEntryArray: true,
  })
  // Extract content of csl-entry div
  .map((entry) => {
    const div = entry[1].match(/<div.*?>(.*?)<\/div>/)
    entry[1] = div[1]
    return entry
  })

// Convert to object with first element as id
const bibObj = Object.fromEntries(bib)
console.debug({ bibObj })

// Read reference strings
const referenceStrings = JSON.parse(readFileSync("./test/reference-strings.json", "utf8"))

// Regex to delete surrounding <span> tags

describe("Bibliography", function () {
  for (const [category, refObjs] of Object.entries(referenceStrings)) {
    describe(category, function () {
      for (const obj of refObjs) {
        const id = obj.id
        const string = obj.string

        // If --verbose
        if (process.argv.includes("--verbose")) {
          console.log("  " + id + ":")
          console.log("    " + string)
          console.log()
        }

        it(id, function () {
          equal(bibObj[id], string)
        })
      }
    })
  }
})
