# New tab page

This is essentially just a React application that is hooked up to the background page data. The new tab page is overwritten in the [manifest file](../public/manifest.json#L34-L35)

[entrypoint](../src/index.js)

## Data

The NTP use a "controller" for all of the data it gets. This "controller" is the **[use-extension hook](../src/hooks/use-extension)**. This handles all the state of the application. There is issues with it and [needs to be refactored](https://github.com/jcblw/Mujo-extension/issues/44) but works rather well at managing interdependent state.

## Shared Components & hooks

All the code in the [component folder](../src/components) and [hooks folder](../src/hooks) are shared between both the Content Script and NTP. Please be mindful when writing code that is specific to either in those directories.
