import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  const outputChannel = vscode.window.createOutputChannel('My Extension Logs');
  outputChannel.appendLine('239023923');
  outputChannel.show(); // Optional: Automatically show the channel

  let disposable = vscode.commands.registerCommand('hide.unhide', () => {
    const globalConfig = vscode.workspace.getConfiguration('files');

    // Add null check for workspace
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage('No workspace folder open');
      return;
    }

    let workspaceUri = workspaceFolders[0].uri;

    try {
      let settingJson = fs.readFileSync(
        workspaceUri.fsPath + '/.vscode/settings.json',
        'utf8'
      );

      const settingsObject = JSON.parse(settingJson);

      // Add type for the exclude object
      let filesExclude: Record<string, boolean> =
        settingsObject['files.exclude'];
      let inverseExclude: Record<string, boolean> = {};

      for (let fileName in filesExclude) {
        inverseExclude[fileName] = !filesExclude[fileName];
      }

      globalConfig.update('exclude', inverseExclude);
    } catch (error) {
      vscode.window.showErrorMessage('Failed to read or parse settings.json');
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate(): void {}
