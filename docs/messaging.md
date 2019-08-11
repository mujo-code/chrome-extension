# Client to Background

All these methods work in both **Content** and **NTP** scripts.

## Access to Storage

This is mostly automated and you should have access already to just about any key needed from the `use-extension` React Hook, but if there is access to a certain key you may access it via the `use-storage` React Hook.

```javascript
const { useStorage } from '../hooks/use-storage'
const Foo = () => {
	const [key, setKey] = useStorage('KEY')
	return (
		<Box>{key}</Box>
		<Button onClick={() => setKey(Math.random())}>Change</Button>
	)
}
```

All access to storage happen through the background script and is async. There will be some time where the key will be the default value until the value is fetch from the background script.

## Custom messages

If you want to send a message to the background script, this could be like something to reset all activity, there is a message method in the extensions lib.

```javascript
await message('event-name' { any: 'data' });
```

This will flow into the message reducer in the background scripts, the response will be resolved from the message and should always respond with at least `{ success: true }`.

# Background to Client

If you are responding to a message there is a method passed into the message reducer that allows you to respond explicitly to the client. That value will be resolved in the client from the message call.
