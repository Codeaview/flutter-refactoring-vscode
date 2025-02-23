import * as assert from "assert";
import { splitIntoTwoTopLevelWidgets, ternarySnippet } from "../../commands/wrap-with-ternary.command";

suite("Wrap with Ternary Tests", () => {

    suite("splitIntoTwoTopLevelWidgets()", () => {
        test("Returns null if no top-level comma", () => {
            const input = `Text('Hello')`;
            const result = splitIntoTwoTopLevelWidgets(input);
            assert.strictEqual(result, null, "Should return null if there's no comma");
        });

        test("Splits exactly two widgets at top-level comma", () => {
            const input = `Text('Hello'),Text('World')`;
            const result = splitIntoTwoTopLevelWidgets(input);
            assert.ok(result !== null, "Should find a top-level comma");
            assert.strictEqual(result![0], `Text('Hello')`);
            assert.strictEqual(result![1], `Text('World')`);
        });

        test("Ignores commas in strings or nested structures", () => {
            const input = `Row(children: [Text('Hello, inside')]), Text('Outside')`;
            // The only top-level comma is between ) and T
            // so we expect it to split into:
            // "Row(children: [Text('Hello, inside')])" and " Text('Outside')"
            const result = splitIntoTwoTopLevelWidgets(input);
            assert.ok(result !== null, "Should find the top-level comma outside nested brackets");
            assert.strictEqual(result![0].trim(), `Row(children: [Text('Hello, inside')])`);
            assert.strictEqual(result![1].trim(), `Text('Outside')`);
        });

        test("Handles bracket depth", () => {
            const input = `(
                Text('Hello'),
              ), Text('World')`;
            // The top-level comma is after ), meaning we have:
            // first widget: "( Text('Hello'), ),"
            // second widget: " Text('World')"
            const result = splitIntoTwoTopLevelWidgets(input);
            assert.ok(result !== null);
            assert.ok(result![0].includes(`Text('Hello')`));
            assert.ok(result![1].includes(`Text('World')`));
        });
    });

    suite("ternarySnippet()", () => {
        test("Single widget (no comma) -> ternary with placeholder for false widget", () => {
            const input = `Text('Single')`;
            const output = ternarySnippet(input);
            // Expect: ${1:condition} ? Text('Single') : ${2:null}
            assert.strictEqual(
                output,
                `\${1:condition} ? Text('Single') : \${2:null}`
            );
        });

        test("Two top-level widgets -> splitted into true/false branch", () => {
            const input = `Text('True'),Text('False')`;
            const output = ternarySnippet(input);
            // Expect: ${1:condition} ? Text('True') : Text('False')
            assert.strictEqual(
                output,
                `\${1:condition} ? Text('True') : Text('False')`
            );
        });

        test("Trims whitespace around splitted widgets", () => {
            const input = `  Text('First') ,  Text('Second')  `;
            const output = ternarySnippet(input);
            // Expect: ${1:condition} ? Text('First') : Text('Second')
            assert.strictEqual(
                output,
                `\${1:condition} ? Text('First') : Text('Second')`
            );
        });

        test("Handles multiline two widgets", () => {
            const input = `
                const Text(
                  'You have pushed the button this many times:',
                ),
                Text(
                  'Counter here',
                )
            `;
            const output = ternarySnippet(input);
            // The first widget is everything up to the comma at top-level depth
            // and the second is everything after that comma
            assert.strictEqual(
                output,
                `\${1:condition} ? const Text(\n                  'You have pushed the button this many times:',\n                ) : Text(\n                  'Counter here',\n                )`
            );
        });
    });

});