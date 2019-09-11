import { useCallback, useState, useReducer } from 'react'

const Actions = {
  add: 'add',
  remove: 'remove',
}

const tabsReducer = (state, action) => {
  switch (action.type) {
    case Actions.add:
      return [...state, action.name]
    case Actions.remove: {
      const index = state.findIndex(action.name)
      return [...state.slice(0, index), ...state.slice(index + 1)]
    }
    default:
      return state
  }
}

export const useTabs = () => {
  const [tabs, dispatch] = useReducer(tabsReducer, [])
  const [currentTab, setCurrentTab] = useState(null)

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
      if (!currentTab) {
        setCurrentTab(name)
      }
    },
    [tabs, dispatch, currentTab, setCurrentTab]
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
      setCurrentTab(name)
    },
    [tabs, setCurrentTab, currentTab]
  )

  return { tabs, currentTab, pushTab, selectTab, removeTab }
}
