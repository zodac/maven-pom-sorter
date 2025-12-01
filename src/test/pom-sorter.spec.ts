import assert from "assert"
import { PomSorter } from "../../src/pom-sorter"

describe("PomOrderer", () => {
    let sorter: PomSorter

    beforeEach(() => {
        sorter = new PomSorter()
    })

    it("should reorder elements in the correct order", () => {
        const input = `
<project>
  <artifactId>example-artifact</artifactId>
  <groupId>com.example</groupId>
  <version>1.0.0</version>
  <modelVersion>4.0.0</modelVersion>
</project>`

        const expected = `
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>example-artifact</artifactId>
  <version>1.0.0</version>
</project>`

        const output = sorter.sort(input)

        // Remove indentation differences for comparison
        assert.strictEqual(output.replace(/\s+/g, ""), expected.replace(/\s+/g, ""))
    })

    it("should preserve whitespace between elements", () => {
        const input = `<project>
  <version>1.0.0</version>

  <groupId>com.example</groupId>
</project>`

        const output = sorter.sort(input)

        // Should still contain the blank line (preserved whitespace)
        assert.match(output, /\n\n/)
    })

    it("should leave non-project XML untouched", () => {
        const input = "<notproject><foo>bar</foo></notproject>"
        const output = sorter.sort(input)
        assert.strictEqual(output, input)
    })

    it("should detect when changes are needed", () => {
        const input = "<project><artifactId>x</artifactId><groupId>y</groupId><modelVersion>4.0.0</modelVersion></project>"
        assert.strictEqual(sorter.hasChanges(input), true)
    })

    it("should detect when no changes are needed", () => {
        const input = "<project><modelVersion>4.0.0</modelVersion><groupId>y</groupId><artifactId>x</artifactId></project>"
        assert.strictEqual(sorter.hasChanges(input), false)
    })

    it("should keep unknown elements at the end", () => {
        const input = `<project>
  <artifactId>example</artifactId>
  <groupId>com.example</groupId>
  <unknown>keepme</unknown>
  <modelVersion>4.0.0</modelVersion>
</project>`

        const output = sorter.sort(input)

        // unknown element should be last
        const unknownIndex = output.indexOf("<unknown>")
        const modelVersionIndex = output.indexOf("<modelVersion>")
        assert(unknownIndex > modelVersionIndex)
    })
})
