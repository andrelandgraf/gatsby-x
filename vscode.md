<h1 align="center">
  VS Code Setup
</h1>

## 🚀 Motivation

I am using a wide variety of VS Code plugins, configs, fonts and themes in all of my projects.
All of them are optional but many might improve your workflow quite a bit.

## 👷 Plugins

- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
- [Emoji](https://marketplace.visualstudio.com/items?itemName=Perkovec.emoji)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
- [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)
- [Polacode](https://marketplace.visualstudio.com/items?itemName=pnp.polacode)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [VSCode MDX](https://marketplace.visualstudio.com/items?itemName=JounQin.vscode-mdx)
- [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)

## 🌈 Themes

- [Cyberpunk](https://marketplace.visualstudio.com/items?itemName=max-SS.cyberpunk)
- [SynthWave'84](https://marketplace.visualstudio.com/items?itemName=RobbOwen.synthwave-vscode)

## ✍ Fonts

- [FiraCode](https://github.com/tonsky/FiraCode)

## 👀 ESLint and Prettier

GatsbyX builds on top of No-Sweat™ Eslint and Prettier Setup by Wes Bos. Follow his instructions on how to setup No-Sweat™ on VS Code. Find the instructions [here](https://github.com/wesbos/eslint-config-wesbos).

Not part of this repo yet but if you are using MDX, feel free to add [eslint-mdx](https://github.com/mdx-js/eslint-mdx).

## 🏁 Final preferences (JSON)

If you followed Wes Bos setup, your final config should look something like this:

```json
{
  // These are all my auto-save configs
  "editor.formatOnSave": true,
  // turn it off for JS and JSX, we will do this via eslint
  "[javascript]": {
    "editor.formatOnSave": false
  },
  "[javascriptreact]": {
    "editor.formatOnSave": false
  },
  // tell the ESLint plugin to run on save
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  // Optional BUT IMPORTANT: If you have the prettier extension enabled for other languages like CSS and HTML, turn it off for JS since we are doing it through Eslint already
  "prettier.disableLanguages": ["javascript", "javascriptreact"]
}
```
