import { Box } from '@jcblw/box'
import React from 'react'
import { FOURTY_FIVE_MINUTES } from '../../constants'
import { msToMinutes, minutesToMS } from '../../lib/time'
import { HeaderS } from '../fonts'

export const BreakTimerForm = props => {
  const { time, enabled, originalURL, setBreakTimer } = props
  const minutes = msToMinutes(time)
  const suffix = minutes === 1 ? '' : 's'
  return (
    <>
      <Box display="flex" direction="row" alignItems="center">
        <Box
          id="break-timer"
          Component="input"
          type="checkbox"
          marginRight="s"
          checked={enabled}
          onChange={() =>
            setBreakTimer(
              originalURL,
              time || FOURTY_FIVE_MINUTES,
              !enabled
            )
          }
        />
        <HeaderS
          marginTop="xs"
          marginBottom="xs"
          labelFor="break-timer"
        >
          Break Timer{' '}
          {enabled
            ? `(show in ${minutes} minute${suffix} of usage)`
            : null}
        </HeaderS>
      </Box>
      {enabled ? (
        <Box display="flex" direction="column">
          <Box
            Component="input"
            type="number"
            value={minutes}
            onChange={e =>
              setBreakTimer(
                originalURL,
                minutesToMS(parseInt(e.target.value || '0', 10)),
                enabled
              )
            }
          />
        </Box>
      ) : null}
    </>
  )
}
