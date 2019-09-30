# Mujō Plugin

This is a set of utilities to create a Mujō plugins. This is a collection of hooks and components that allow you to hook into functionality of Mujō extension without having to modify its source code.

[See an example](../extension/plugins/mujo-plugin-breaktimer)

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

We are working on more documentation, for more info see the [original RFC](./RFC.md)
