# Mujō Plugin

This is a set of utilities to create a Mujō plugins. This is a collection of hooks and components that allow you to hook into functionality of Mujō extension without having to modify its source code.

* [Example plugin](../extension/plugins/mujo-plugin-breaktimer)
* [Render targets doc](./docs/README.md)
* [Components doc](./docs/components.md)
* [Hooks doc](./docs/hooks.md)

## Install

```
npm i @mujo/plugins
```

## Usage

```javascript
import { Background, Content, NewTabPage } from '@mujo/plugins'

const MyPlugin = () => (
  <>
    <Background>
      <MyBackgroundScripts />
    </Background>
    <NewTabPage>
      <MyNewTabPage />
    </NewTabPage>
    <Content>
      <MyContentScripts />
    </Content>
  </>
)

export default MyPlugin
```
