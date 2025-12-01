import * as assert from "assert"
import * as vscode from "vscode"
import * as path from "path"
import * as fs from "fs"

suite("Extension Integration Tests", () => {
    const testPom = path.join(__dirname, "pom.xml")

    setup(() => {
        if (!fs.existsSync(testPom)) {
            fs.writeFileSync(testPom, "<project><z/><a/></project>")
        }
    })

    teardown(() => {
        if (fs.existsSync(testPom)) {
            fs.unlinkSync(testPom)
        }
    })

    test("Extension activates", async () => {
        const ext = vscode.extensions.getExtension("zodac.maven-pom-sorter")
        assert.ok(ext, "Extension not found")
        await ext?.activate()
        assert.strictEqual(ext?.isActive, true)
    })

    test("Command sorts pom.xml", async () => {
        const doc = await vscode.workspace.openTextDocument(testPom)
        const editor = await vscode.window.showTextDocument(doc)

        const unsorted = "<project><z/><a/></project>"
        await editor.edit(e =>
            e.replace(new vscode.Range(0, 0, doc.lineCount, 0), unsorted),
        )

        await vscode.commands.executeCommand("pom-sorter.sortPom")
        await new Promise(res => setTimeout(res, 300))

        const result = doc.getText()
        assert.notStrictEqual(result, unsorted, "File should be sorted")
    })
})
