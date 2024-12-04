# hide-extension

simple vscode extension to hide/unhiide files and folders from explorer

## notes

- bug: disable vscode-icons
- bug: only works in vscode code (not cursor)
- bug: vsce login publisher needs to be run from the terminal (not in scripts)

## how it works

It inverts the Explorer visibility of all the files and folders included in `.vscode/settings.json`

```
{
  "files.exclude": {
    "**/.gitignore": true,
    "**/.gitattributes": false
  }
}
```

## usage

Type `Hide/Unhide Files from Explorer` in the Command Palette Prompt

## install

You can find the extension in the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ghostmind.hide-unhide)

## development

- `f5 to build and launch into another window`
- `cmd+r to reload from the extension host window`

