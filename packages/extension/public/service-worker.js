const ICONCACHE = 'icon-cache-1'

// White list icon domain
const WHITELISTED_DOMAIN = 'https://getmujo.com/'

const onCachableRequest = async event => {
  const cachedResponse = await caches.match(event.request)
  if (cachedResponse) {
    return cachedResponse
  }
  const cache = await caches.open(ICONCACHE)
  const response = await fetch(event.request)
  await cache.put(event.request, response.clone())
  return response
}

// Add Cache
/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('install', () => {
  // event.waitUntil(Promise.resolve())
})

// Clean-up Cache
/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('activate', () => {
  // event.waitUntil(Promise.resolve())
})

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  const { url } = event.request
  if (url.startsWith(`${WHITELISTED_DOMAIN}/api/icon`)) {
    event.respondWith(onCachableRequest(event))
  }
})
