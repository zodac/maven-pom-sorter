import * as vscode from "vscode"
import { PomSorter } from "./pom-sorter"

const pomSorter = new PomSorter()

/**
 * Main listener function for auto-save
 */
export function onWillSaveDocument(event: vscode.TextDocumentWillSaveEvent): void {
    const document = event.document
    if (!document.fileName.endsWith("pom.xml")) {
        return
    }

    const xmlText = document.getText()
    const newXml = pomSorter.sort(xmlText)

    if (newXml !== xmlText) {
        const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(xmlText.length),
        )
        event.waitUntil(Promise.resolve([vscode.TextEdit.replace(fullRange, newXml)]))
    }
}

/**
 * Command for Command Palette
 */
async function orderActivePom(): Promise<void> {
    const editor = vscode.window.activeTextEditor
    if (!editor) {
        return
    }

    const document = editor.document
    if (!document.fileName.endsWith("pom.xml")) {
        return
    }

    const xmlText = document.getText()
    const newXml = pomSorter.sort(xmlText)

    if (newXml !== xmlText) {
        const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(xmlText.length),
        )
        await editor.edit(editBuilder => editBuilder.replace(fullRange, newXml))
        vscode.window.showInformationMessage("pom.xml sorted!")
    }
}

/**
 * VS Code activation
 */
export function activate(context: vscode.ExtensionContext): void {
    context.subscriptions.push(
        vscode.workspace.onWillSaveTextDocument(onWillSaveDocument),
        vscode.commands.registerCommand("pom-sorter.sortPom", orderActivePom),
    )
}

export function deactivate(): void { }
