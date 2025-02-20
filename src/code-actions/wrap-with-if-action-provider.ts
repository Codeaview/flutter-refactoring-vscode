import { window, CodeAction, CodeActionProvider, CodeActionKind } from "vscode";
import { getSelectedText } from "../utils";

export class WrapWithIfCodeActionProvider implements CodeActionProvider {
    // Indicate we’re returning a “refactor” type CodeAction
    public static readonly providedCodeActionKinds = [CodeActionKind.Refactor];

    // Return a list of actions to be performed
    public provideCodeActions(): CodeAction[] {

        const editor = window.activeTextEditor;
        if (!editor) { return []; }

        const selectedText = editor.document.getText(getSelectedText(editor));
        if (selectedText === "") { return []; }

        return [
            {
                command: "wrapWithIf.wrapWithIf",
                title: "Wrap with If",
            },
            {
                command: "wrapWithIf.wrapWithIfWithoutBraces",
                title: "Wrap with If (no braces)",
            },
            {
                command: "wrapWithIf.wrapWithIfAndArray",
                title: "Wrap with If (Spread)",
            },
            {
                command: "wrapWithIf.wrapWithTernary",
                title: "Wrap with Ternary",
            },
        ].map((c) => {
            let action = new CodeAction(c.title, CodeActionKind.Refactor);
            action.command = {
                command: c.command,
                title: c.title,
            };
            return action;
        });
    }
}