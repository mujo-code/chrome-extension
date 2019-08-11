# Architecture

The Chrome extension is comprised of three different script. The **[new tab page](../src/index.js)**, **[background script](../src/background.js)** and **[content script](../src/content.js)**. Its primary database storage is [IndexDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) using [IDB](https://www.npmjs.com/package/idb).

## New Tab Page ( NTP)

The new tab page is a purely a ReactJS application and is the main interface of the application. The new tab page is the screen that is shown to the user when the user open up a new tab in Chrome.

[New Tab Page Documentation](./new-tab-page.md)

## Background Script

The [background script](https://developer.chrome.com/extensions/background_pages) is a script that is ran in an environment somewhat comparable to a service worker. The difference is that it also has a full [DOM](https://www.w3.org/TR/WD-DOM/introduction.html). This script is able to communicate with content script and the NTP.

[Background Script Documentation](./background-script.md)

## Content Script

With the introduction of Screen Time the extension now has a [content script](https://developer.chrome.com/extensions/content_scripts). The content script is able to be injected into website that the Chrome extension has permission to access. This houses a ReactJS application and some vanilla javascript.

[Content Script Documentation](./content-script.md)

## Communication between scripts.

There is a few ways to message back in forth between scripts... Hooks, Abstractions, Raw Chrome API calls.

[Communicating Between Scripts](./messaging.md)

## Notable Files

### [contants.js](../src/constants.js)

This file is shared with all scripts and applications. I holds all types of configuration like:

- Alarm keys
- Database names
- Storage keys
- Feature flags
- Additional permission
- General configuration

## [model.js](../src/model.js)

This file is shared with all scripts and applications. It holds the keys that the key value storage in our database houses. If you need to add any additional keys to store information add it here or the [application will throw](../src/background/storage/storage.js#L16-18).
