import {
	commands,
	ExtensionContext,
	languages,
  } from "vscode";
import { WrapWithIfCodeActionProvider } from "./code-actions/wrap-with-if-action-provider";
import { wrapWithIf, wrapWithIfNoBraces, wrapWithIfAndArray } from "./commands";

const DART_MODE = { language: "dart", scheme: "file" };

export function activate(_context: ExtensionContext) {

  _context.subscriptions.push(
	commands.registerCommand(
		"wrapWithIf.wrapWithIf",
		wrapWithIf,
	  ),
	  commands.registerCommand(
		"wrapWithIf.wrapWithIfWithoutBraces",
		wrapWithIfNoBraces,
	  ),
	  commands.registerCommand(
		"wrapWithIf.wrapWithIfAndArray",
		wrapWithIfAndArray,
	  ),
	  languages.registerCodeActionsProvider(
      DART_MODE,
      new WrapWithIfCodeActionProvider(),
    ),
  );
}


export function deactivate() {
  // Cleanup if needed
}