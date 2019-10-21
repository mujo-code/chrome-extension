import { Extension } from '@mujo/utils'
import React, { useEffect, useCallback, useReducer } from 'react'

const KEYS = [91, 93]
const PRESSED = 'PRESSED'
const RELEASED = 'RELEASED'

const tabFocusReducer = (state, action) => {
  console.log({ action, state })

  switch (action.type) {
    case PRESSED:
      return { cmdPressed: true }
    case RELEASED:
      return { cmdPressed: false }
    default:
      return state
  }
}
export const TabFocusDetector = ({ constants }) => {
  const [{ cmdPressed }, dispatch] = useReducer(tabFocusReducer, {})

  const onKeyDown = useCallback(
    e => {
      if (KEYS.includes(e.keyCode)) {
        dispatch({ type: PRESSED })
      }
    },
    [dispatch]
  )

  const onKeyUp = useCallback(
    e => {
      if (KEYS.includes(e.keyCode)) {
        dispatch({ type: RELEASED })
      }
    },
    [dispatch]
  )

  const onClick = useCallback(
    e => {
      // console.log({ cmdPressed, target: e.target })

      let { target } = e

      while (target) {
        if (target instanceof HTMLAnchorElement) {
          console.log(target.getAttribute('href'))
          break
        }

        target = target.parentNode
      }

      if (target.href && cmdPressed) {
        e.preventDefault()
        e.stopImmediatePropagation()

        const options = { url: target.href, shiftKey: e.shiftKey }

        if (!options.url.match(/:\/\//)) {
          const url = `${window.location.origin}${options.url}`
          Object.assign(options, { url })
        }

        Extension.message('open new tab with focus', options)
      }
    },
    [cmdPressed]
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)
    document.body.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
      document.body.removeEventListener('click', onClick)
    }
  }, [onKeyDown, onKeyUp, onClick])

  return <></>
}
