import * as assert from "assert";
import {
  ifSnippet,
  ifSnippetWithoutBraces,
  ifAndArraySnippet
} from "../../commands/wrap-with-if.command";

suite("Wrap with If snippets tests", () => {

  suite("ifSnippet()", () => {
    test("Wraps a single widget in `if (condition) { ... }`", () => {
      const input = `Text('Hello')`;
      const result = ifSnippet(input);

      // Expect new lines + indentation:
      const expected =
        `if (\${1:condition}) {
  Text('Hello')
}`;
      assert.strictEqual(result, expected);
    });
  });

  suite("ifSnippetWithoutBraces()", () => {
    test("Wraps a single widget without braces", () => {
      const input = `Text('Hello')`;
      const result = ifSnippetWithoutBraces(input);

      // Notice no curly braces:
      const expected = `if (\${1:condition})Text('Hello')`;
      assert.strictEqual(result, expected);
    });
  });

  suite("ifAndArraySnippet()", () => {
    test("Wraps a single widget with array spread", () => {
      const input = `Text('Hello')`;
      const result = ifAndArraySnippet(input);

      const expected =
        `if (\${1:condition}) ...[
  Text('Hello')
]`;
      assert.strictEqual(result, expected);
    });

    test("Handles multiple lines with spread", () => {
      const input =
        `Column(
  children: [
    Text('Hello'),
    Text('World'),
  ],
)`;

      const result = ifAndArraySnippet(input);

      // Any new lines remain inside the snippet:
      const expected =
        `if (\${1:condition}) ...[
  Column(
  children: [
    Text('Hello'),
    Text('World'),
  ],
)
]`;
      assert.strictEqual(result, expected);
    });
  });
});