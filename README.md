## Mujō Source

Mujō is a extension that reminds you not to over work yourself.

## About REPO

This repo is a [lerna](https://lerna.js.org/) repo. I contains no only the source code for the Chrome Extension but also some supporting libraries.

## Packages

- [Extension](./packages/extension) - source of extension
- [@mujo/plugins](./packages/plugins) - utils for Mujō plugins
- [@mujo/ui](./packages/ui) - ui styles and components for Mujō
- [@mujo/utils](./packages/utils) - utils for Mujō

## Running

```shell
npm i
npx lerna bootstrap
npm start
```

[more docs](./packages/extension/docs/README.md)
