/* global dataLayer */
window.dataLayer = window.dataLayer || []
// commonly known as gtag = track
export function track(...args) {
  dataLayer.push(args)
}
track('js', new Date())

track('config', 'UA-141601619-1')
