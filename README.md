# Hide/Unhide Files Extension

A simple yet powerful VSCode extension to toggle the visibility of files and folders in the Explorer by inverting the `files.exclude` settings from your workspace configuration.

## Features

- **Toggle Visibility**: Instantly show/hide files and folders based on your workspace's `files.exclude` settings
- **Workspace Aware**: Works with your existing `.vscode/settings.json` configuration
- **Command Palette Integration**: Easy access through VSCode's Command Palette
- **Non-destructive**: Only changes visibility, never deletes files

## How It Works

The extension inverts the Explorer visibility of all files and folders included in `.vscode/settings.json`:

```json
{
  "files.exclude": {
    "**/.gitignore": true,
    "**/.gitattributes": false
  }
}
```

When you run the command, files currently hidden (`true`) become visible, and visible files (`false`) become hidden.

## Usage

1. Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Type `Hide/Unhide Files in Explorer`
3. Press Enter to toggle visibility

## Installation

You can find the extension in the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ghostmind.hide-unhide).

## Development Workflow

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Deno](https://deno.land/) (for build scripts)

### Project Structure

```
├── app/                    # Extension source code
│   ├── src/               # TypeScript source files
│   │   └── extension.ts   # Main extension entry point
│   ├── dist/              # Compiled JavaScript output
│   ├── package.json       # Extension manifest and npm scripts
│   ├── tsconfig.json      # TypeScript configuration
│   └── esbuild.js         # Build configuration
├── scripts/               # Development scripts (TypeScript/Deno)
│   ├── build.ts          # Build and package VSIX
│   ├── login.ts          # Configure vsce authentication
│   └── publish.ts        # Publish to marketplace
├── releases/              # Generated VSIX files
├── .vscode/              # VSCode workspace configuration
│   ├── launch.json       # Debug configuration
│   ├── tasks.json        # Build tasks
│   └── settings.json     # Workspace settings
└── README.md
```

### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/komondor/hide-unhide.git
   cd hide-unhide
   ```

2. **Install dependencies**
   ```bash
   cd app
   npm install
   ```

3. **Start development**
   ```bash
   npm run watch
   ```

### Development Commands

#### Local Development

- **Start development mode**: `npm run watch`
  - Runs TypeScript compiler and esbuild in watch mode
  - Automatically rebuilds on file changes
  - Use `F5` in VSCode to launch Extension Development Host

- **Debug the extension**:
  1. Press `F5` or go to Run and Debug → "Run Extension"
  2. This opens a new VSCode window with your extension loaded
  3. Test your extension in this new window
  4. Use `Ctrl+R` / `Cmd+R` to reload the extension after changes

- **Manual compilation**: `npm run compile`
  - Single build without watch mode

#### Build and Package

- **Production build**: `npm run package`
  - Creates optimized build in `dist/` directory
  - Used before publishing

- **Create VSIX package**: `deno run -A scripts/build.ts`
  - Builds the extension and generates `.vsix` file
  - Output saved to `releases/` directory
  - Ready for manual installation or GitHub releases

#### Publishing

1. **Configure authentication**
   ```bash
   # Set environment variables
   export PUBLISHER_ID="your-publisher-id"
   export AZURE_TOKEN="your-azure-devops-pat"
   
   # Configure vsce credentials
   deno run -A scripts/login.ts
   ```

2. **Publish to marketplace**
   ```bash
   deno run -A scripts/publish.ts
   ```

### Authentication Setup

To publish extensions, you need an Azure DevOps Personal Access Token:

1. Go to [Azure DevOps](https://dev.azure.com/your-publisher)
2. Generate a Personal Access Token with **Marketplace** permissions
3. Token expires after 90 days and needs renewal
4. Set environment variables:
   - `PUBLISHER_ID`: Your marketplace publisher ID
   - `AZURE_TOKEN`: Your Azure DevOps PAT

### VSCode Configuration

The project includes optimized VSCode configuration:

- **Launch Configuration**: Preconfigured debugging setup
- **Build Tasks**: Integrated TypeScript and esbuild watching
- **Recommended Extensions**: TypeScript and ESLint support
- **Workspace Settings**: Optimized for extension development

### Scripts Overview

| Script | Purpose | Technology |
|--------|---------|------------|
| `build.ts` | Build extension and create VSIX package | Deno + zx |
| `login.ts` | Configure vsce authentication | Deno |
| `publish.ts` | Publish to VS Code Marketplace | Deno + zx |

### Development Tips

1. **Hot Reloading**: Use `npm run watch` and `F5` for smooth development
2. **Debugging**: Set breakpoints in TypeScript files; they work in the Extension Development Host
3. **Testing**: Test your extension in the Extension Development Host window
4. **Packaging**: Always run `npm run package` before creating releases
5. **Version Management**: Update version in `app/package.json` before publishing

### Troubleshooting

- **Extension not loading**: Check the Developer Console in the Extension Development Host
- **Build errors**: Ensure all dependencies are installed with `npm install`
- **Publishing fails**: Verify your Azure DevOps PAT is valid and has correct permissions
- **VSIX creation fails**: Make sure you have `vsce` installed globally: `npm install -g vsce`

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly in the Extension Development Host
5. Create a pull request

## License

MIT License - see [LICENSE](app/LICENSE) file for details.
