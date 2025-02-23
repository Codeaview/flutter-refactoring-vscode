import { window, CodeAction, CodeActionProvider, CodeActionKind } from "vscode";
import { getSelectedText } from "../utils";

export class WrapWithIfCodeActionProvider implements CodeActionProvider {
    public static readonly providedCodeActionKinds = [CodeActionKind.Refactor];

    public provideCodeActions(): CodeAction[] {

        const editor = window.activeTextEditor;
        if (!editor) { return []; }

        const selectedText = editor.document.getText(getSelectedText(editor));
        if (selectedText === "") { return []; }

        return [
            {
                command: "flutterRefactoringExt.wrapWithIf",
                title: "Wrap with If",
            },
            {
                command: "flutterRefactoringExt.wrapWithIfWithoutBraces",
                title: "Wrap with If (no braces)",
            },
            {
                command: "flutterRefactoringExt.wrapWithIfAndArray",
                title: "Wrap with If (Spread)",
            },
            {
                command: "flutterRefactoringExt.wrapWithTernary",
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