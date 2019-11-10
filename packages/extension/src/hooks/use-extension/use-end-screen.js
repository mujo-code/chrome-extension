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
  // eslint-disable-next-line
  const [endScreens, dispatch] = useReducer(endScreenReducer, [])

  const lookupEndScreen = useCallback(
    type =>
      [...endScreens]
        .reverse()
        .find(endScreen => endScreen.endScreenType === type),
    [endScreens]
  )

  const registerEndScreen = useCallback(endScreen => {
    dispatch({ type: Actions.add, ...endScreen })
  }, [])

  const removeEndScreen = useCallback(endScreen => {
    dispatch({ type: Actions.remove, ...endScreen })
  }, [])
  return { removeEndScreen, registerEndScreen, lookupEndScreen }
}
