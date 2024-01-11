import { equal } from "assert"
import Cite from "citation-js"
import { readFileSync } from "fs"

// Load LHTC style
const templateName = "lhtc"
const template = readFileSync("./dist/lhtc.csl", "utf8")

const config = Cite.plugins.config.get("@csl")
config.templates.add(templateName, template)

// Load test data
// Relative to script directory
const data = readFileSync("./test/export.json", "utf8")

// Generate a bibliography for each item individually to avoid omissions due to repeated authors
const items = JSON.parse(data).items

// Object to collect bibliographies
const bibObj = {}

for (const item of items) {
  // Re-stringify (necessary for Zotero CSL API)
  const jsonString = JSON.stringify(item)

  const cite = new Cite(jsonString)
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

  // Add item to bibObj, using the item's id as key
  const [itemId, bibString] = bib[0]
  bibObj[itemId] = bibString
}

// Read reference strings
const referenceStrings = JSON.parse(readFileSync("./test/reference-strings.json", "utf8"))

describe("Bibliography", function () {
  for (const [category, refObjs] of Object.entries(referenceStrings)) {
    describe(category, function () {
      for (const obj of refObjs) {
        const id = obj.id
        const string = obj.string
        const cslItem = items.find((item) => item.id === id)
        const heading = `${cslItem.type} ${id}: ${string.split(".")[0]}`

        // If --verbose
        if (process.argv.includes("--verbose")) {
          console.log("  " + id + ":")
          console.log("    " + string)
          console.log()
        }

        it(heading, function () {
          equal(bibObj[id], string)
        })
      }
    })
  }
})
