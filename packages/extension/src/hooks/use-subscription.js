import { Payment, Functional } from '@mujo/utils'
import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react'
import { ACTIVE_PRODUCT } from '../constants'

const { compose, first } = Functional

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
  hydrateUser(await Payment.getPurchases())
  setProducts(await Payment.getProducts())
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
        await Payment.buy(sku)
      } catch (e) {
        setPurchaseError(e)
        return
      }
      // eager update user
      setUser({
        ...user,
        products: [getProduct(sku)],
        isSubscribed: true,
      })
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
  return <Provider {...props} value={value} />
}

export const useSubscription = () => useContext(context)
