import { useCallback, useReducer } from 'react'

const Actions = {
  add: 'add',
  remove: 'remove',
}

const endScreenReducer = (state, action) => {
  switch (action.type) {
    case Actions.add:
      return [...state, action]
    case Actions.remove: {
      const index = state.findIndex(
        endScreen => endScreen.endScreenType === action.endScreenType
      )
      return [...state.slice(0, index), ...state.slice(index + 1)]
    }
    default:
      return state
  }
}

export const useEndScreen = key => {
  const [endScreens, dispatch] = useReducer(endScreenReducer, [])

  const lookupEndScreen = useCallback(type =>
    endScreens.find(endScreen => endScreen.endScreenType === type)
  )

  const registerEndScreen = useCallback(
    endScreen => {
      dispatch({ type: Actions.add, ...endScreen })
    },
    [dispatch]
  )

  const removeEndScreen = useCallback(
    endScreen => {
      dispatch({ type: Actions.remove, ...endScreen })
    },
    [dispatch]
  )

  return { removeEndScreen, registerEndScreen, lookupEndScreen }
}
