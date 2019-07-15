import { promisifyOptions } from './promisify'
import { exception } from './tracker'
import { set } from './util'

const env = process.env.PRODUCT_ENV || 'prod'
// TODO make this less scarey
export const paymentsAPI = () => window.google.payments.inapp
export const getProducts = async () => {
  const options = { parameters: { env } }
  const response = await promisifyOptions(
    paymentsAPI().getSkuDetails,
    options
  )
  return response.response.details.inAppProducts
}

export const getPurchases = async () => {
  const options = { parameters: { env } }
  const response = await promisifyOptions(
    paymentsAPI().getPurchases,
    options
  )
  return response.response.details
}

export const buy = async sku => {
  const parameters = { env }
  const options = {
    parameters,
    sku,
  }
  // create callstack outside catch
  const { stack } = new Error()
  try {
    const ret = await promisifyOptions(paymentsAPI().buy, options)
    return ret
  } catch (e) {
    // Logging error
    const type = e.response.errorType
    const paymentError = new Error(
      `Failed to purchase subscription [${type})]`
    )
    set(paymentError, 'stack', stack)
    exception(paymentError)
    throw paymentError
  }
}
