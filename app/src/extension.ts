import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {




  let disposable = vscode.commands.registerCommand('hide.unhide', () => {
    const globalConfig = vscode.workspace.getConfiguration('files');

    // Add null check for workspace
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage('No workspace folder open');
      return;
    }

    let workspaceUri = workspaceFolders[0].uri;

    // Helper function to invert and update files.exclude
    function invertAndUpdateExclude(settingsPath: string, config: vscode.WorkspaceConfiguration | null = null) {
      try {
        let settingJson = fs.readFileSync(settingsPath, 'utf8');
        const settingsObject = JSON.parse(settingJson);

        let filesExclude: Record<string, boolean> = settingsObject['files.exclude'];
        if (!filesExclude) {
          vscode.window.showWarningMessage(`No 'files.exclude' found in ${settingsPath}`);
          return;
        }
        let inverseExclude: Record<string, boolean> = {};
        for (let fileName in filesExclude) {
          inverseExclude[fileName] = !filesExclude[fileName];
        }

        // If config is provided, update via VS Code API, else write directly to file
        if (config) {
          config.update('exclude', inverseExclude);
        } else {
          settingsObject['files.exclude'] = inverseExclude;
          fs.writeFileSync(settingsPath, JSON.stringify(settingsObject, null, 2), 'utf8');
        }
      } catch (error) {
        vscode.window.showErrorMessage(`Failed to process settings at ${settingsPath}`);
      }
    }

    // Update workspace settings
    invertAndUpdateExclude(workspaceUri.fsPath + '/.vscode/settings.json', globalConfig);

    // Detect $HOME for portability
    const homeDir = process.env.HOME || process.env.USERPROFILE;
    if (!homeDir) {
      vscode.window.showWarningMessage('Could not determine user home directory.');
      return;
    }

    // Possible machine settings paths for VSCode and Cursor
    const machineSettingsPaths = [
      `${homeDir}/.vscode-server/data/Machine/settings.json`,
      `${homeDir}/.cursor-server/data/Machine/settings.json`
    ];

    for (const settingsPath of machineSettingsPaths) {
      if (fs.existsSync(settingsPath)) {
        invertAndUpdateExclude(settingsPath);
      }
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate(): void {}
