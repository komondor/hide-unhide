const vscode = require("vscode");
const fs = require("fs");

function activate(context) {
  let disposable = vscode.commands.registerCommand("hide.unhide", function () {
    const globalConfig = vscode.workspace.getConfiguration("files");

    let workspaceUri = vscode.workspace.workspaceFolders[0].uri;

    let settingJson = fs.readFileSync(
      workspaceUri.path + "/.vscode/settings.json",
      "utf8"
    );

    const settingsObject = JSON.parse(settingJson);

    let filesExclude = settingsObject["files.exclude"];
    let inverseExclude = {};

    for (let fileName in filesExclude) {
      inverseExclude[fileName] = !filesExclude[fileName];
    }

    globalConfig.update("exclude", inverseExclude);
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
