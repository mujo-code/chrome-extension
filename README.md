## Mujō Source

Mujō is a Chrome Extension that reminds you not to over work yourself. This is the source code for that extension.

## About this repository

This repository is a [lerna](https://lerna.js.org/) repo. I contains not only the source code for the Chrome Extension but also some supporting libraries.

## Packages

- [Extension](./packages/extension) - source of extension
- [@mujo/plugins](./packages/plugins) - utils for Mujō plugins
- [@mujo/ui](./packages/ui) - ui styles and components for Mujō
- [@mujo/utils](./packages/utils) - utils for Mujō

## Running

```shell
yarn
yarn lerna run prepublish
```

## Installing into Chrome

- Go to [chrome://extensions/](chrome://extensions/) and turn on developer mode
- Click Load unpacked and select `/packages/extension/build` directory from this app
- Enjoy the extension!

> Each change will be rebuilt automatically if your server is running, you will need to refresh and changes to the public folder require a reload of the chrome application.

## Find more info

More about the extension

- [extension docs](./packages/extension/docs/README.md)

Build your own Mujō plugin!

- [plugin docs](./packages/extension/docs/README.md)
