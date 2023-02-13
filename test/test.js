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

const example = new Cite(data)
const bib = example
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

// Convert to object with first element as key
const bibObj = Object.fromEntries(bib)

// Read reference strings
const referenceStrings = JSON.parse(readFileSync("./test/reference-strings.json", "utf8"))

// Regex to delete surrounding <span> tags

describe("Bibliography", function () {
  for (const [category, refObjs] of Object.entries(referenceStrings)) {
    describe(category, function () {
      for (const obj of refObjs) {
        const bibkey = obj.key
        const string = obj.string
        it(bibkey, function () {
          equal(bibObj[bibkey], string)
        })
      }
    })
  }
})
