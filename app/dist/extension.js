"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode = __toESM(require("vscode"));
var fs = __toESM(require("fs"));
function activate(context) {
  let disposable = vscode.commands.registerCommand("hide.unhide", () => {
    const globalConfig = vscode.workspace.getConfiguration("files");
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage("No workspace folder open");
      return;
    }
    let workspaceUri = workspaceFolders[0].uri;
    function invertAndUpdateExclude(settingsPath, config = null) {
      try {
        let settingJson = fs.readFileSync(settingsPath, "utf8");
        const settingsObject = JSON.parse(settingJson);
        let filesExclude = settingsObject["files.exclude"];
        if (!filesExclude) {
          vscode.window.showWarningMessage(`No 'files.exclude' found in ${settingsPath}`);
          return;
        }
        let inverseExclude = {};
        for (let fileName in filesExclude) {
          inverseExclude[fileName] = !filesExclude[fileName];
        }
        if (config) {
          config.update("exclude", inverseExclude);
        } else {
          settingsObject["files.exclude"] = inverseExclude;
          fs.writeFileSync(settingsPath, JSON.stringify(settingsObject, null, 2), "utf8");
        }
      } catch (error) {
        vscode.window.showErrorMessage(`Failed to process settings at ${settingsPath}`);
      }
    }
    invertAndUpdateExclude(workspaceUri.fsPath + "/.vscode/settings.json", globalConfig);
    const homeDir = process.env.HOME || process.env.USERPROFILE;
    if (!homeDir) {
      vscode.window.showWarningMessage("Could not determine user home directory.");
      return;
    }
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
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
