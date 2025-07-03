# hide-extension

simple vscode extension to hide/unhiide files and folders from explorer

## publish


- get a new personal access token at https://dev.azure.com/${PUBLISHER_NAME} (expired after 90 days)
- exectue `run custom login`


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

- use vscode (not cursor)
- `cp -r ../ ~/` to have a developement environemnt in the extension window
- `f5 to build and launch into another window`
- `cmd+r to reload from the extension host window`

