# hide-extension

simple vscode extension to hide/unhiide files and folders from explorer

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
- `cmd+r to reload`
- `cmd+shift+p and execute extension`
