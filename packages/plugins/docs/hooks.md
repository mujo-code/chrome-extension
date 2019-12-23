# Hooks

Hooks will allow plugins to get access to many of the applications internal API's. Things like setting up some keys in the database or event listening to the internal alarm system. Some of these hooks can run on all of the scripts and will look like from your application that the hooks are global working between the scripts.

## Universal Hooks

### useStorage

This hook should allow the plugin to access data inside the database. It should allow for access to the database between all the scripts.

```javascript
const [value, setValue] = useStorage('KEY', defaultValue)
```

The data is all stored locally inside the browser inside indexDB.

## Background Hooks

### useHeartBeat

This hook will allow plugins to listen to the heartbeat of the application. Its is a 15-minute tick that the background process has. It is also based on alarms so the timing is not precise at all and sometimes can be deferred by the browser. `useHeartBeat` should be used for triggers based on usage. This allows the plugin to interject at times of activity. It gets a single argument to the effect function which is if the user is currently active.

```javascript
useHeartBeat(isActive => {
  if (isActive && otherCondition) return doSomething()
}) // TODO maybe have dependencies here for cache busting
```

### useMessage

This hook is will allow plugins to receive messages from NTP and content to background scripts. This interface is unified between all scripts for ease of use.

```javascript
useMessage((type, body, response) => {
  // do something with message
  // TODO: figure out interface for sending out messages
  // eg. responses, and broadcasting on background or sending a message
  // on client scripts.
})
```
