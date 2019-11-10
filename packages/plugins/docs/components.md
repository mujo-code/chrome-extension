# Components

Components are a declarative way to layout your plugin. All components are available from the main import. Eg.

```javascript
import { Background } from '@mujo-code/plugins'
```

## Entry file

Each plugin will need to have an entry file. This file is the initial React component for your plugin. The structure of this file is up to you. You can immediately split the functionality into the separate render targets.

The entry file of you main component should avoid using hooks since the different components in that level will have different render targets and will most likely get out of sync, eg, if you use `useState` there will be two or possibly three different states in the three different render targets.

```javascript
const MyPlugin = () => (
  <>
    <Background>
      <MyBackgroundComponent />
    </Background>
    <Setting />
    <Tab>
      <MyTabComponent />
    </Tab>
    <Content>
      <MyContentComponent />
    </Content>
  </>
)
export default MyPlugin
```

We are able to transport children of the plugin into the main tree via. [mujo-code/ingress](https://github.com/mujo-code/ingress)

## Adding to the Manifest

Each plugin has the ability to add properties to the manifest this allows plugins to get access to new origins, and to add optional permissions. To do this you need to add an additional file to the root of your plugin called `config.js`. Also all keys are transformed from camelcase to snake case and CSP property will also be camelcase compared to dash case.

```javascript
module.exports = () => {
  return {
    optionalPermission: ['tabs'],
    contentSecurityPolicy: {
      connectSrc: ['https://getmujo.com']
    }
  }
}
```

## Background

The Background component will allow you to create a tree for your background functionality in your plugin. See [main readme](./README.md) for more info.

```javascript
const MyBackgroundComponent = () => {
  useHeartBeat(() => { ... })
  return null
}

...
<Background><MyBackgroundComponent /></Background>
...
```

## Content

The Content component is a component that allows you to render scripts into the content scripts. See [main readme](./README.md) for more info.

```javascript
const MyContentComponent = () => {
  const [isActive] = useStorage('IS_MY_PLUGIN_ACTIVE')
  if (!isActive) return null
  return <Box>Hi there</Box>
}

...
<Content><MyContentComponent /></Content>
...
```

## NewTabPage

The NewTabPage component allows you to build out pieces of an application that will live on top of the existing NewTabPage. See [main readme](./README.md) for more info.

```javascript
const MyNTPComponent = () => {
  return (
    <>
      <Setting ... />
      <Tab ... />
    </>
  )
}

...
<NewTabPage><MyNTPComponent /></NewTabPage>
...
```

#### Setting

> Setting needs to be inside a NewTabPage

The Setting component allows plugins to access the settings modal, this means that the user can configure the plugin based on the users' preferance.

```jsx
...
<Setting
  title="My Plugin"
  description="You can enable disable the plugin"
  type="boolean"
  onChange={(e) => { ... }}
  value={isActive}
/>
...
```

> the onChange handler will need to have a cached ref of the callback using something like `useCallback` or it will cause infinite rendering

##### Props

- title (string) - The title for the plugin setting
- description (string) - The description for the plugin setting
- type ('boolean' | 'button') - Some type of input for user to interact with currently boolean will render a switch and button will render the button component.
- onChange (function) - A function to handle a click or change of value.
- value (boolean | string) - Either the value of the boolean flag or the string for the button call to action.

#### Tab

> Tab needs to be inside a NewTabPage

The tab component allows plugins to render their content inside the New Tab Page. This is a great way to display some important information from the plugin or just add a nice new view. To the New Tab Page. The user will have to navigate to this tab to use.

```javascript
<Tab title="My Plugin">
  <Box>I am in a tab</Box>
</Tab>
```

#### EndScreen

> EndScreen needs to be inside a NewTabPage

The EndScreen component  allows you to setup a "end screen" after a breathing exercise in the NewTabPage.

```javascript
<Tab type={constants.DEFAULT_END_SCREEN}>
  <Box>You are doing great!</Box>
</Tab>
```
