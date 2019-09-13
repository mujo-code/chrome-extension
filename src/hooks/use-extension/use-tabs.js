import { useCallback, useReducer, useEffect } from 'react'
import { useStorage } from '../use-storage'

const Actions = {
  add: 'add',
  remove: 'remove',
  setCurrent: 'setCurrent',
}

const tabsReducer = (state, action) => {
  switch (action.type) {
    case Actions.add:
      return {
        currentTab: state.currentTab || action.name,
        tabs: [...state.tabs, action.name],
      }
    case Actions.remove: {
      const index = state.findIndex(action.name)
      return {
        ...state,
        tabs: [
          ...state.tabs.slice(0, index),
          ...state.tabs.slice(index + 1),
        ],
      }
    }
    case Actions.setCurrent: {
      return { ...state, currentTab: action.name }
    }
    default:
      return state
  }
}

export const useTabs = key => {
  const [persistedTab, setPersistedTab, { pending }] = useStorage(key)
  const [{ tabs, currentTab }, dispatch] = useReducer(tabsReducer, {
    currentTab: persistedTab,
    tabs: [],
  })

  const pushTab = useCallback(
    name => {
      const exist = !!tabs.find(tab => tab === name)
      if (exist) {
        console.warn(
          `Attempted to push a tab "${name}" that already exist`
        )
        return
      }
      dispatch({ type: Actions.add, name })
    },
    [tabs, dispatch]
  )

  const removeTab = useCallback(
    name => {
      const index = tabs.findIndex(tab => tab === name)
      if (index === -1) {
        console.warn(
          `Attempted to remove a tab "${name}" that does not exist`
        )
        return
      }
      // TODO: seems like we might have a case where we will
      // not have a current tab
      dispatch({ type: Actions.remove, name })
    },
    [tabs, dispatch]
  )

  const selectTab = useCallback(
    name => {
      if (name === currentTab) return
      const exist = !!tabs.find(tab => tab === name)
      if (!exist) {
        console.warn(
          `Attempted to select tab "${name}" that does not exist`
        )
        return
      }
      dispatch({ type: Actions.setCurrent, name })
    },
    [tabs, dispatch, currentTab]
  )

  // updates selected tab from storage
  useEffect(() => {
    if (currentTab !== persistedTab && !pending) {
      selectTab(persistedTab)
    }
  }, [persistedTab, pending])

  // updates storage from selected tab
  useEffect(() => {
    if (currentTab !== persistedTab && !pending) {
      setPersistedTab(currentTab)
    }
  }, [currentTab])

  return { tabs, currentTab, pushTab, selectTab, removeTab }
}
