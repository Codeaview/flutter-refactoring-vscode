import {
	commands,
	ExtensionContext,
	languages,
} from "vscode";
import { WrapWithIfCodeActionProvider } from "./code-actions/wrap-with-if-action-provider";
import { wrapWithIf, wrapWithIfNoBraces, wrapWithIfAndArray, wrapWithTernary } from "./commands";

const DART_MODE = { language: "dart", scheme: "file" };

export function activate(_context: ExtensionContext) {

	_context.subscriptions.push(
		commands.registerCommand(
			"flutterRefactoringExt.wrapWithIf",
			wrapWithIf,
		),
		commands.registerCommand(
			"flutterRefactoringExt.wrapWithIfWithoutBraces",
			wrapWithIfNoBraces,
		),
		commands.registerCommand(
			"flutterRefactoringExt.wrapWithIfAndArray",
			wrapWithIfAndArray,
		),
		commands.registerCommand(
			"flutterRefactoringExt.wrapWithTernary",
			wrapWithTernary,
		),

		languages.registerCodeActionsProvider(
			DART_MODE,
			new WrapWithIfCodeActionProvider(),
		),
	);
}