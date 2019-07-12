import { useState, useEffect, useCallback } from 'react'
import { compose } from '../lib/functional'
import {
  buy as buyProduct,
  getPurchases,
  getProducts,
} from '../lib/payment'

export const userFactory = (products = []) => ({
  isSubscribed: !!products.length,
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

export const useSubscription = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [products, setProducts] = useState([])
  const [user, setUser] = useState(userFactory())
  const [purchaseError, setPurchaseError] = useState(null)

  const buy = useCallback(
    async sku => {
      setPurchaseError(null) // reset error
      try {
        await buyProduct(sku)
      } catch (e) {
        return setPurchaseError(e)
      }
      // rehydrate user
      return hydrate({ setProducts, setUser })
    },
    [setPurchaseError, setUser, setProducts]
  )

  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true)
      hydrate({ setProducts, setUser })
    }
  }, [setProducts, setUser, isInitialized, setIsInitialized])

  return {
    user,
    products,
    buy,
    purchaseError,
  }
}
