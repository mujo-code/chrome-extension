import { promisifyOptions } from './promisify'

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

export const buy = sku => {
  const parameters = { env }
  const options = {
    parameters,
    sku,
  }
  return promisifyOptions(paymentsAPI().buy, options)
}
