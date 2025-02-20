import { wrapWith } from "../utils";

/**
 * A snippet function that inserts a placeholder for the condition.
 */
const ifSnippet = (widget: string) => {
  return `if (\${1:condition}) {
  ${widget}
}`;
};

const ifSnippetWithoutBraces = (widget: string) => {
  return `if (\${1:condition})${widget}`;
};

const ifAndArraySnippet = (widget: string) => {
  return `if (\${1:condition}) ...[
  ${widget}
]`;
};

/**
 * Attempt to split the user’s selection into exactly two
 * top-level widgets at a comma (,) that is not inside any
 * parentheses, braces, or quotes. If successful, returns
 * [widget1, widget2]. Otherwise, returns null.
 */
function splitIntoTwoTopLevelWidgets(selectedText: string): [string, string] | null {
  let depth = 0;
  let boundaryIndex = -1;
  let inString: '"' | "'" | null = null;

  for (let i = 0; i < selectedText.length; i++) {
    const char = selectedText[i];

    // If we are inside a string, only watch for end of string or escaped quotes
    if (inString) {
      if (char === inString) {
        inString = null;
      } else if (char === "\\") {
        // Skip the next character to ignore escaped quotes
        i++;
      }
    } else {
      // Not currently in a string
      if (char === '"' || char === "'") {
        inString = char;
      } else if (char === "(" || char === "{" || char === "[" || char === "<") {
        depth++;
      } else if (char === ")" || char === "}" || char === "]" || char === ">") {
        depth--;
      } else if (char === "," && depth === 0) {
        // Found a top-level comma
        boundaryIndex = i;
        break;
      }
    }
  }

  // No top-level comma means we cannot split into exactly two widgets
  if (boundaryIndex === -1) {
    return null;
  }

  return [
    selectedText.slice(0, boundaryIndex),
    selectedText.slice(boundaryIndex + 1),
  ];
}

/**
 * Ternary snippet generator:
 * - If it finds two top-level widgets, place the first in the true branch,
 *   and the second in the false branch.
 * - Otherwise, treat the entire selection as a single (true) widget and
 *   insert a placeholder for the false widget.
 */
const ternarySnippet = (selectedText: string) => {
  const splitted = splitIntoTwoTopLevelWidgets(selectedText);

  if (splitted) {
    const [firstWidget, secondWidget] = splitted;
    return `\${1:condition} ? ${firstWidget.trim()} : ${secondWidget.trim()}`;
  }

  // Only one widget (or no top-level comma found)
  return `\${1:condition} ? ${selectedText} : \${2:widget}`;
};

/**
 * Wrap the widget with `if (...) { ... }`
 */
export const wrapWithIf = async () => wrapWith(ifSnippet);
export const wrapWithIfNoBraces = async () => wrapWith(ifSnippetWithoutBraces);
export const wrapWithIfAndArray = async () => wrapWith(ifAndArraySnippet);

/**
 * Wrap the selected widget(s) with ternary
 * condition ? widget1 : widget2
 */
export const wrapWithTernary = async () => wrapWith(ternarySnippet);