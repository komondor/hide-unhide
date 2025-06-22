# Hide/Unhide Files

Toggle visibility of files and folders in VS Code Explorer by inverting the files.exclude settings from your workspace configuration.

## Features

- **Quick Toggle**: Instantly hide or unhide files and folders in the VS Code Explorer
- **Workspace-based**: Works with your existing `files.exclude` settings in your workspace configuration
- **Smart Inversion**: Inverts the current exclude settings to show/hide files
- **Non-destructive**: Preserves your original exclude settings

## Usage

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Search for "Hide/Unhide Files in Explorer"
3. Execute the command to toggle file visibility

The extension will:
- If files are currently hidden by `files.exclude` settings, it will show them
- If files are currently visible, it will hide them based on common patterns

## How It Works

This extension works by reading your workspace's `files.exclude` configuration and inverting the boolean values. This allows you to quickly toggle between showing all files and hiding files based on your configured patterns.

## Requirements

- VS Code 1.95.0 or higher

## Extension Settings

This extension uses your existing VS Code `files.exclude` settings. No additional configuration is required.

## Known Issues

None at this time. Please report issues on the [GitHub repository](https://github.com/komondor/hide-unhide).

## Release Notes

### 0.0.6

- Added license field for marketplace compatibility
- Improved marketplace presentation

### 0.0.5

- Bug fixes and stability improvements

### 0.0.4

- Initial release
- Basic hide/unhide functionality

## Contributing

Contributions are welcome! Please visit the [GitHub repository](https://github.com/komondor/hide-unhide) to contribute.

## License

This extension is licensed under the MIT License. 