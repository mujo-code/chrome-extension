import { Box } from '@mujo/box'
import { Time } from '@mujo/utils'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  FOURTY_FIVE_MINUTES,
  TRANSLATION_FILE,
} from '../../constants'
import { HeaderS } from '../fonts'
import { Input } from '../input'
import { Switch } from '../switch'

const { msToMinutes, minutesToMS } = Time
export const BreakTimerForm = props => {
  const { t } = useTranslation(TRANSLATION_FILE)
  const { time, enabled, originalURL, setBreakTimer } = props
  const minutes = msToMinutes(time)
  const suffix = minutes === 1 ? '' : 's'
  return (
    <Box display="flex" direction="column">
      {enabled ? (
        <Box
          display="flex"
          direction="column"
          marginRight="s"
          alignItems="flexStart"
        >
          <Input
            marginTop="zero"
            marginBottom="m"
            id="break-timer-time"
            label={t('shown-in-usage', { minutes, suffix })}
            type="number"
            value={minutes}
            onChange={e =>
              setBreakTimer(
                originalURL,
                minutesToMS(
                  Math.abs(parseInt(e.target.value || '0', 10))
                ),
                enabled
              )
            }
          />
        </Box>
      ) : null}
      <Box
        display="flex"
        direction="row"
        alignItems="center"
        marginRight="s"
        flex="1"
      >
        <Switch
          id="break-timer"
          marginRight="s"
          value={enabled}
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
          htmlFor="break-timer"
        >
          {t('break-timer')}
        </HeaderS>
      </Box>
    </Box>
  )
}
