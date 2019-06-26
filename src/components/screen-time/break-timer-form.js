import { Box } from '@jcblw/box'
import React from 'react'
import { FOURTY_FIVE_MINUTES } from '../../constants'
import { msToMinutes, minutesToMS } from '../../lib/time'
import { HeaderS } from '../fonts'
import { Input } from '../input'

export const BreakTimerForm = props => {
  const { time, enabled, originalURL, setBreakTimer } = props
  const minutes = msToMinutes(time)
  const suffix = minutes === 1 ? '' : 's'
  return (
    <Box display="flex" direction="column">
      <Box
        display="flex"
        direction="row"
        alignItems="center"
        marginRight="s"
        flex="1"
      >
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
          marginTop="zero"
          marginBottom="zero"
          labelFor="break-timer"
        >
          Break Timer
        </HeaderS>
      </Box>
      {enabled ? (
        <Box
          display="flex"
          direction="column"
          marginRight="s"
          alignItems="flexStart"
        >
          <Input
            marginTop="zero"
            marginBottom="zero"
            id="break-timer-time"
            label={`Shown in ${minutes} minute${suffix} of usage`}
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
    </Box>
  )
}
