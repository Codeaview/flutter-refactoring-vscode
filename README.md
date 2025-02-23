# Flutter Refactoring Extension

A Visual Studio Code extension that provides additional refactoring actions for Dart and Flutter projects, enabling you to quickly wrap widgets with if statements, if (no braces), if spread operators, or convert Widgets into a ternary (?:) structure.

## Features

- Wrap with If: Insert an if (condition) { ... } around selected code.
- Wrap with If (no braces): Insert if (condition) ... (without curly braces) around selected code.
- Wrap with If (Spread): Insert if (condition) ...[ ... ] around selected code, useful for Flutter's spread operator in lists.
- Wrap with Ternary: Convert one or two widgets into a condition ? firstWidget : secondWidget expression.

## Examples

### Ternary Refactoring

Original selection

```dart
Text('Hello'), Text('World')
```

After "Wrap with Ternary"

```dart
condition ? Text('Hello') : Text('World')
```

### If Refactoring

Original selection

```dart
Container()
```

After "Wrap with If (Spread)"

```dart
if (condition) ...[
  Container()
]
```

## Installation

Marketplace: Search for “Flutter Refactoring Extension” in the Visual Studio Code Marketplace and click Install.

## Usage

### Command Palette

1. Open a Dart file in VS Code.
2. Select the widget(s) you want to wrap.
3. Press Ctrl+Shift+P (Windows/Linux) or Cmd+Shift+P (macOS) to open the Command Palette.
4. Type "Wrap with If", "Wrap with Ternary", or any of the listed commands below.
5. Press Enter to apply the refactoring.

### Refactoring Menu (Right-Click)

1. In a Dart file, highlight the widget(s) you want to wrap.
2. Right-click in the editor to open the context menu.
3. Choose "Wrap with If" (or another relevant command) from the Refactoring menu.

## Available Commands

| Command                     | Description                                                                 |
|------------------------------|-----------------------------------------------------------------------------|
| Wrap with If                | Wraps the selected widget(s) with if (condition) { ... }                  |
| Wrap with If (no braces)    | Wraps the selected widget(s) with if (condition) ....                     |
| Wrap with If (Spread)       | Wraps with if (condition) ...[ ... ] around selected code, useful for lists of Widgets. If you select code and apply this refactor, the whole selection will be wrapped. |
| Wrap with Ternary           | Wraps selected widget(s) in a condition ? firstWidget : secondWidget expression. If only one widget is selected, then it will be the firstWidget and secondWidget will be . |

## Known Issues

- The code actions are triggered only when opening/editing a Dart file. Opening a non-Dart file before opening a Dart file may not activate the extension.
- After using "Wrap with If" or "Wrap with Ternary", you might need to manually format your code if you disabled the editor.action.formatDocument or have a specific formatter that doesn’t auto-run.

## Contributions

Contributions are welcome! Here’s how you can help:

1. Fork the repository and clone it locally.
2. Create a new branch for your feature/bugfix:

    ```bash
    git checkout -b my-feature
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Make your changes, then build and test:

    ```bash
    npm run compile
    npm test
    ```

5. Commit and push your changes to your fork.
6. Open a Pull Request on GitHub.

## License

MIT License © 2025 Dominik Czerwoniuk

This extension is open-source and free for personal or commercial usage. See the LICENSE file for details.

Enjoy using the Flutter Refactoring Extension! If you have any questions, issues, or feature requests, please feel free to open an issue or reach out on Github.

Disclaimer:
This extension is provided "as is" without any warranty. Use at your own risk.
