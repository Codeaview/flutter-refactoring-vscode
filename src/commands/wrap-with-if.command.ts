import { wrapWith } from "../utils";

/**
 * A snippet function that inserts a placeholder for the condition.
 */
export const ifSnippet = (widget: string) => {
  return `if (\${1:condition}) {
  ${widget}
}`;
};

export const ifSnippetWithoutBraces = (widget: string) => {
  return `if (\${1:condition})${widget}`;
};

export const ifAndArraySnippet = (widget: string) => {
  return `if (\${1:condition}) ...[
  ${widget}
]`;
};

/**
 * Wrap the widget with `if (...) { ... }`
 */
export const wrapWithIf = async () => wrapWith(ifSnippet);
export const wrapWithIfNoBraces = async () => wrapWith(ifSnippetWithoutBraces);
export const wrapWithIfAndArray = async () => wrapWith(ifAndArraySnippet);