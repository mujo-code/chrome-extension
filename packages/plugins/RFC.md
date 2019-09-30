- Start Date: 8-20-2019

# Summary

This document is going to outline in depth how we are planning to achieve what we are calling Mujō React plugins. Essentially I started out this document on how I planned to open-source this project and the things needed to be able to do that. It was very high level and had many gaps. This document will have a more definitive guide on not only how we can achieve this but also what the end goal is.

# Overview

There are a few things that need to be tidied up to be able to achieve this. Mostly building out the API to support this, but the main idea is its all one React component.

```javascript
import { Background, Content, Setting, Tab } from '@mujo/plugin/components'
import { useHeartBeat, useMessages } from '@mujo/plugin/hooks'

const MyBackgroundScripts = () => {
  useHeartBeat(() => {
    // triggers on each heart beat
  })
  useMessages(
    message => {
      // trigger when message gets fired
    },
    [MESSAGE_TYPE]
  )
  return null
}

const MyPlugin = () => (
  <>
    <Background>
      <MyBackgroundScripts />
    </Background>
    <Setting {...setting} />
    <Tab {...tab} />
    <Content {...content} />
  </>
)

MyPlugin.manifest = {
  optionalPermissions: ['notifications'],
  contextSecurityPolicy: { connectSrc: 'https://getmujo.com' },
}

export default MyPlugin
```

# Motivation

The project is open-sourced will allow for more meaningful collaboration. It will show the dedication of Mujō to being part of the community of Open Source Software.

Essentially Mujō Paid version will be a fork of the OS version with some added plugins. The plugins will contain the IP of Mujō LLC.

# Design Breakdown

## Existing Clean Up

### Tab View

First and foremost we will need a tabbing system for the main view. We already have a [spec](https://www.notion.so/jjcblw/Tab-Design-Spec-5015366ee4fb4111aea40a16fcef36f5) for it. There are some changes to this implement that we need to factor in. Essentially we need the ability to push new tabs into the design.

### Settings

Settings would need to be more pluggable. I think we should maybe focus on implementing some of the components that would go into the plugin spec. It sort of works that way now but should allow users to start fleshing it out more.

```javascript
...
<Setting title="Foo" description="Bar" type="boolean" value={foo}/>
...
```

This should be able to go anywhere.

### Port Background Script to React

This should not entail much work. It actually should just hook into the existing functionality, but wrap it in effects.

## Set-up for plugins

### Config file

Using [cosmic config](https://www.npmjs.com/package/cosmiconfig) we need to set up some configuration in the root of the directory. This will allow users to have a place to specify plugins. It will largely be based on the [manifest](https://developer.chrome.com/apps/manifest) file format but having something separate allows us to generate the manifest easier to build time. An example of this file.

```javascript
// TODO: this is subject to change
const pkg = require('./package.json')
module.exports = {
  plugins: ['mujo-screen-time'],
  longName: `${pkg.name} - Be mindful of your time`,
  offlineEnabled: true,
  permissions: ['tabs', 'webNavigation', 'alarms', 'background', 'topSites'],
  optionalPermissions: ['activeTab', 'https://*/*', 'http://*/*'],
  icons: {
    16: 'favicon.png',
    32: 'favicon.png',
  },
  browserAction: {
    defaultIcon: 'favicon.png',
  },
  webAccessibleResources: ['*'],
  contentSecurityPolicy: {
    scriptSrc: ['self', 'https:getmujo.com'],
    fontSrc: ['https://fonts.gstatic.com'],
    imgSrc: ['self'],
  },
}
```

Note that the keys are transformed from the **camelCase** format in this file to **snake_case** in the generated manifest.

### Manifest generator

The manifest generator will use values from the `package.json` and config to compile a manifest file on the build. It will pull name and version from `package.json`, any other manifest keys from `config`, and any additional things from the plugins. This could be `optionalPermissions` or the additional to the `contentSecurityPolicy`. After pulling all this info it merges and makes a manifest.json from these values. May be beneficial to have a validator as well but should not be required.

### Plugin resolver

The plugins resolver will do a few things on build time.

- It will read file from a .mujorc file using [cosmic config](https://www.npmjs.com/package/cosmiconfig)
- From the plugins array of this config, we are going to build a file that is going to be required by all the scripts.

```javascript
// example of the generated file.
export default {
  'mujo-screen-time': safeRequire('../plugins/mujo-screen-time'),
  'mujo-predictive-breaks': safeRequire('mujo-predictive-breaks'),
}
```

- The plugins can live in a `plugins` folder locally or from an npm module.

## Plugin Interface

Essentially the plugin is a React Component. That is it, the interface to the plugin is all driven by paradigms in React. These interfaces will be in the form of a separate module.

### Hooks

Hooks will allow plugins to get access to many of the applications internal API's. Things like setting up some keys in the database or event listening to the internal alarm system. Some of these hooks can run on all of the scripts and will look like from your application that the hooks are global working between the scripts.

#### Universal Hooks

##### useStorage

This hook should allow the plugin to access data inside the database. It should allow for access to the database between all the scripts.

```javascript
const [value, setValue] = useStorage('KEY', defaultValue)
```

##### useMessage

This hook is will allow plugins to send and receive messages from NTP and content to background scripts. This interface is unified between all scripts for ease of use.

```javascript
useMessage((type, body, response) => {
  // do something with message
  // TODO: figure out interface for sending out messages
  // eg. responses, and broadcasting on background or sending a message
  // on client scripts.
})
```

##### usePermission

This hook allows plugins to request additional optional permissions. The returned object will have two methods and a boolean flag if the application has permission. With the method, `requestPermssion` you have the ability to request permissions you asked for. `removePermission` will remove the permissions from your application.

```javascript
const { hasPermission, requestPermission, removePermission } = usePermission(
  permissions
)
```

#### Background Hooks

##### useHeartBeat

This hook will allow plugins to listen to the heartbeat of the application. Its is a 15-minute tick that the background process has. It is also based on alarms so the timing is not precise at all and sometimes can be deferred by the browser. `useHeartBeat` should be used for triggers based on usage. This allows the plugin to interject at times of activity. It gets a single argument to the effect function which is if the user is currently active.

```javascript
useHeartBeat(isActive => {
  if (isActive && otherCondition) return doSomething()
}) // TODO maybe have dependencies here for cache busting
```

#### NTP/Content Hooks

##### useTheme

This is primarily used to tap into the theme of the application. Right now there is dark and light mode. Both modes have a series of colors associated with them.

```javascript
// This is the dark theme
{
  foreground: 'mischka',
  foregroundSecondary: 'white',
  background: 'outerSpace',
  backgroundSecondary: 'gravel',
  highlight: 'saltBox',
  buttonStyle: 'primary',
}
```

These are values you may pass into the box component.

```jsx
...
<Box backgroundColor={background} color={foreground}>I am themed</Box>
<Button design={buttonStyle}>Ok?</Button> // TODO: swap style to design?
...
```

To use this hook to get the values above.

```javascript
const { background, foreground, highlight } = useTheme()
```

### Components

Components are a declarative way to layout your plugin. The top-level of you main component should avoid using hooks since the different components in that level will have different render targets and will most likely get out of sync, eg, if you use `useState` there will be two or possibly three different states in the three different render targets.

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

This is how we will allow plugin content to gen into the react render tree. [mujo-code/ingress](https://github.com/mujo-code/ingress)

#### Adding to the Manifest

Each plugin should have the ability to add in some additional params to the manifest this will allow plugins to get access to new origins, and to add optional permissions. To allow this the plugin should have a static key of "manifest".

```javascript
MyPlugin = {
  optionalPermissions: ['activeTab'],
  contentSecurityPolicy: { connectSrc: ['https://getmujo.com'] },
}
```

Right now we should have as limited as a scope as possible only allowing optional permissions and ContentSecourityPolicy.

#### Background

The Background component will allow you to create a tree for your background functionality in your plugin. This means you will have access to all the background hooks in your application. Children do no get rendered to the DOM, and this render target is more about using hooks to access functionality on the backend.

```javascript
const MyBackgroundComponent = () => {
  useHeartBeat(() => { ... })
  return null
}

...
<Background><MyBackgroundComponent /></Background>
...
```

#### Content

The Content component is a component that very much like the Background component in the sense it allows you to target only the content scripts of the application. The component is rendered inside of a react-modal and will overlay the page the content script is running in.

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

#### NewTabPage

The NewTabPage component allows you to build out pieces of an application that will live on top of the existing NewTabPage. This Component acts like a way to render the plugin views into specific areas.

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

The Setting component allows plugins to access the settings modal, this means that the user can configure the plugin based on the users' needs.

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

#### Player

The play is just a component that you should have access too for the ability to reuse the functionality.

> TODO document player component more.

## Refactor

- Screen Time ( put into the plugin )
- Predictive breaks

# Drawbacks

The only issue with this is that it needs to have some enforced conventions. This can be done via some verbose documentation or linting rules ( or both ).

- No hooks can be placed at a top level of this component because it might be perceived that the data would persist between background and other components.
- Only certain hooks can be used in Background v. other Components.
- There needs to be buy-in for the entire system. Eg. Using EmotionJS and Box.

# Alternatives

- There is a `life cycle hook` implementation that I had that looked like the configuration of Gatsby.
- Have one let me know!

# Adoption strategy

We would need to take this spec and create some extensive documentation around it. Also, give more insight into all the possible styles from Box and maybe some more in-depth of possible plugins.

I think having examples would be great. Not just functionality we refactor into plugins but also maybe some potential plugins.

There also might be some issues with the flow of getting plugins to work or how to get plugins into the core extension.

# How we teach this

I am thinking it would be great to have workshops! It is not going to be a huge community so it might be fun to teach people in person. Also, have spectrum chat have a plugin-specific room.

# Unresolved questions

This does not outline the usage of components like our typography and box component. I do think those should be exposed for plugin authors though.

Figuring out Content component more seems like plugin author would need access to open the modal, style it. To know if something else is already open and potentially other things. Explore taking the break timer model and see what kind of access it needs to work.

Should we look into not allowing access to chrome APIs directly for security reasons? Is it a bad thing.

How much should we enforce the current standards to plugin authors, mostly around styles and usage of Box?
