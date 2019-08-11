# Content Script

The content script has two bits of functionality. It has some tracking that it does for the screen time functionality, and also a break time modal for break timer functionality.

[entrypoint](../src/content.js)
[content app](../src/components/content-app)
[content scripts](../src/content)

## Tracking

The [timing script](../src/content/timing.js) essentially will send a bunch of activity data to the background script. This allows features like screen time to be able to get the usage of sites to display to the users.

## React application

This is a React application that lives inside of [react-modal](https://github.com/reactjs/react-modal). It allows things like break timers to render content on-top of the existing webpage.

Lots of functionality is shared between the NTP and the Content script, and all components and hooks should be compatible with both apps.

## Injection

The application needs [permissions](../src/constants.js#L64-L67) to inject this content script into pages. If permissions are not available [no scripts are injected](../src/background/inject.js#L17-18). The injection of the content script happens inside the background script.
