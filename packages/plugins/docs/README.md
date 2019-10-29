# Plugins

Plugins are a way to render content, and functionality into the Mujō plugin without having to know the entry points for things like a background script or content script.

## Extension Scripts

In the Mujō extension there is three render targets.

* New tab script
* Content script
* Background script

All of these targets are individual script that are created. Each render target has their own DOM and window object. They do not share memory space and are essentially sandboxed from each other. The context of the scripts is also quite different. If you have worked with a extension before you probably already know what these scripts do.

### New Tab script

Mujō can override the new tab page and also has a HTML document. This is probably the most tradition web page, since we have a fully rendered HTML document and view the user  can interact with.

The plugin system abstract this page away to a React component called `NewTabPage`. When in the New tab page script the `NewTabPage` component will render its children.

```jsx
...
<NewTabPage>
  <MyPluginView />
</NewTabPage>
```

Since there is already a view for the Mujō there is specific targets int the `NewTabPage` where your plugin may render content.

* Settings
* Tabs

See [components](./components.md) for more details on these components.

### Background script

The background script is probably the farthest from a traditional HTML page. The background script has no view, and is a long running process in the background of the extension. This is useful for talking between the DB and other targets. Some Extension api's also are only allowed in background scripts.

The reason why we still use the same paradigm of React components for a viewless render target is because now with the introduction of React Hooks we have a clear model of how we can react to changes in state and also manipulate state, and instead of introducing new paradigms into the plugin system we chose to leverage the same state management patterns already being used in React. This also have the benefit of being able to declaratively render certain components in the background state management script.

```jsx
...
<Background>
  <MyPluginBackground />
</Background>
```
