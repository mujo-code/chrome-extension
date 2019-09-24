;(function() {
  const f = this
  const g = function(a, d) {
    const c = a.split('.')
    let b = window || f
    c[0] in b || !b.execScript || b.execScript(`var ${c[0]}`)
    for (var e; c.length && (e = c.shift()); ) {
      c.length || void 0 === d
        ? (b = b[e] ? b[e] : (b[e] = {}))
        : (b[e] = d)
    }
  }
  const h = function(a) {
    const d = chrome.runtime.connect(
      'nmmhkkegccagdldgiimedpiccmgmieda',
      {}
    )
    let c = !1
    d.onMessage.addListener(b => {
      c = !0
      'response' in b && !('errorType' in b.response)
        ? a.success && a.success(b)
        : a.failure && a.failure(b)
    })
    d.onDisconnect.addListener(() => {
      !c &&
        a.failure &&
        a.failure({
          request: {},
          response: { errorType: 'INTERNAL_SERVER_ERROR' },
        })
    })
    d.postMessage(a)
  }
  g('google.payments.inapp.buy', a => {
    a.method = 'buy'
    h(a)
  })
  g('google.payments.inapp.consumePurchase', a => {
    a.method = 'consumePurchase'
    h(a)
  })
  g('google.payments.inapp.getPurchases', a => {
    a.method = 'getPurchases'
    h(a)
  })
  g('google.payments.inapp.getSkuDetails', a => {
    a.method = 'getSkuDetails'
    h(a)
  })
})()
