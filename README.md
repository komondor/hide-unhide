# hide-extension

simple vscode extension to hide files and folders from explorer

## how it works

add file to exclude list in .vscode/settings.json

```
{
  "files.exclude": {
    "**/.gitignore": true,
    "**/.gitattributes": false
  }
}
```

launch the extension from the command palette (Hide and Unhide File from Explorer)

It will inverse the current setting and apply it to the current workspace.

## development

- `f5 to build and launch into another window`
- `cmd+r to reload`
- `cmd+shift+p and execute extension`
