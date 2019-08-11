# Top level folders

This is a quick overview of what is in a top level folder.

## src

This is all of the compiled javascript code. It is the place where the source for background, content, and new tab page is. If you are adding new application code this is 99% of the time where the code will go.

### src/background

This is where background script specific code lives. All code here is exclusive to the background script.

### src/components

This folder holds react components. The standard is to use a dasherized version of the component name as the top level folder name, for example `button-group`. This folder has an `index.js` file for the main export and a test `index.test.js`. If the test has any snapshots they will be scoped to this folder. This allows for organization of sub dependecies of components without flooding the top level scope of components. Think of it is **domain** based folders.

Components can be shared between the NTP and Content Script.

### src/content

This folder holds any content script specific scripts.

### src/hooks

This folder hold any custom [React hooks](https://reactjs.org/docs/hooks-overview.html). This if needed can also be split into **domain** based folders.

Hooks can be shared between the NTP and Content Script.

### src/lib

This is utilities that usually are decouple from React or the application logic itself. This is usually code that is usually doing some type of functionality that is not specific to this application.

### src/styles

This is a place that houses any additions to the [Box](https://github.com/mujo-code/box) style guide.

## public

The other 1% of code will go here. This a place where static files will be place and will be included into the bundle

## build

This is not in source control but is where the compiled version of the code is.

## config

This is where the build configuration lives, this can be something like web-pack configuration or environment variables.

## scripts

This is where all build, test, and distribution script live. This is largely built from ejecting from `create-react-app`.

## **\_\_mocks\_\_**

This is just top level mocks for Jest
