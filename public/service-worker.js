const ICONCACHE = 'icon-cache-1'

// White list icon domain
const WHITELISTED_DOMAIN = 'https://xn--muj-sxa.com/'

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
self.addEventListener('install', event => {
  // event.waitUntil(Promise.resolve())
})

// Clean-up Cache
self.addEventListener('activate', event => {
  // event.waitUntil(Promise.resolve())
})

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  const { url } = event.request
  if (url.startsWith(WHITELISTED_DOMAIN)) {
    event.respondWith(onCachableRequest(event))
  }
})
