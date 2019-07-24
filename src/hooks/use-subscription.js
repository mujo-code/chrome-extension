import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react'
import { ACTIVE_PRODUCT } from '../constants'
import { compose, first } from '../lib/functional'
import {
  buy as buyProduct,
  getPurchases,
  getProducts,
} from '../lib/payment'

export const activeProducts = products =>
  products.filter(product => product.state === ACTIVE_PRODUCT)

export const userFactory = (products = []) => ({
  isSubscribed: !!activeProducts(products).length,
  products,
  has: product => products.includes(product),
})

export const hydrate = async ({ setProducts, setUser }) => {
  const hydrateUser = compose(
    setUser,
    userFactory
  )
  hydrateUser(await getPurchases())
  setProducts(await getProducts())
}

const context = React.createContext({ user: userFactory([]) })
export const SubscriptionProvider = props => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [products, setProducts] = useState([])
  const [user, setUser] = useState(userFactory())
  const [purchaseError, setPurchaseError] = useState(null)

  const getProduct = useCallback(
    sku => first(products.filter(product => product.sku === sku)),
    [products]
  )

  const buy = useCallback(
    async sku => {
      setPurchaseError(null) // reset error
      try {
        await buyProduct(sku)
      } catch (e) {
        setPurchaseError(e)
        return
      }
      // eager update user
      setUser(
        Object.assign({}, user, {
          products: [getProduct(sku)],
          isSubscriber: true,
        })
      )
    },
    [getProduct, user]
  )

  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true)
      hydrate({ setProducts, setUser })
    }
  }, [setProducts, setUser, isInitialized, setIsInitialized])

  const { Provider } = context

  const value = {
    buy,
    getProduct,
    isInitialized,
    products,
    purchaseError,
    user,
  }
  // eslint-disable-next-line no-underscore-dangle
  window.__MUJO_SUBSCRIPTION__ = value
  return <Provider {...props} value={value} />
}

export const useSubscription = () => useContext(context)
