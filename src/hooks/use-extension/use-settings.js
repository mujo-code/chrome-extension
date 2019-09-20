import { useCallback, useReducer } from 'react'

const Actions = {
  add: 'add',
  remove: 'remove',
  update: 'update',
}

const settingsReducer = (state, action) => {
  switch (action.type) {
    case Actions.update: {
      const index = state.settings.findIndex(
        setting => setting.label === action.setting.label
      )
      return {
        settings: [
          ...state.settings.slice(0, index),
          { ...action.setting },
          ...state.settings.slice(index + 1),
        ],
      }
    }
    case Actions.add:
      return {
        ...state,
        settings: [...state.settings, action.setting],
      }
    case Actions.remove: {
      const index = state.settings.findIndex(
        setting => setting.label === action.setting.label
      )
      return {
        settings: [
          ...state.settings.slice(0, index),
          ...state.settings.slice(index + 1),
        ],
      }
    }
    default:
      return state
  }
}

const defaultState = { settings: [] }

export const useSettings = key => {
  const [{ settings }, dispatch] = useReducer(
    settingsReducer,
    defaultState
  )

  const pushSetting = useCallback(
    thisSetting => {
      const exist = !!settings.find(
        setting => setting.label === thisSetting.label
      )
      if (exist) {
        return
      }
      dispatch({ type: Actions.add, setting: thisSetting })
    },
    [settings, dispatch]
  )

  const removeSetting = useCallback(
    thisSetting => {
      const index = settings.findIndex(
        setting => setting.label === thisSetting.label
      )
      if (index === -1) {
        return
      }
      dispatch({ type: Actions.remove, setting: thisSetting })
    },
    [settings, dispatch]
  )

  const updateSetting = useCallback(
    thisSetting => {
      const index = settings.findIndex(
        setting => setting.label === thisSetting.label
      )
      if (index === -1) {
        return
      }
      dispatch({ type: Actions.update, setting: thisSetting })
    },
    [settings, dispatch]
  )

  return { settings, pushSetting, removeSetting, updateSetting }
}
