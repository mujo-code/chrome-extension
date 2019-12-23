import { Setting, useStorage } from '@mujo/plugins'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  SUB_DETAILS_MODAL,
  CURRENT_SUB_SKU,
  TRANSLATION_FILE,
  BREATH_MAX,
  BREATH_MIN,
  SUPPORT_URL,
  WEBSTORE_URL,
  VERSION,
  CONDITIONAL_NEW_TAB_PAGE_KEY,
} from '../../constants'
import { useExtension } from '../../hooks/use-extension'

export const Settings = ({ children }) => {
  const {
    user,
    setUpsellModal,
    setBreathAmount,
    breathAmount,
  } = useExtension()
  const { t } = useTranslation(TRANSLATION_FILE)
  const openUpsell = useCallback(() => {
    setUpsellModal({
      name: SUB_DETAILS_MODAL,
      sku: CURRENT_SUB_SKU,
      callback: () => {},
    })
  }, [setUpsellModal])

  const setBreath = useCallback(amount => {
    setBreathAmount(
      Math.min(Math.max(amount, BREATH_MIN), BREATH_MAX)
    )
  }, [])
  const openWebstore = useCallback(() => {
    window.open(WEBSTORE_URL)
  }, [])
  const openSupport = useCallback(() => {
    window.open(SUPPORT_URL)
  }, [])

  const [
    conditionalNewTabPageEnabled,
    setConditionalNewTabPageEnabled,
  ] = useStorage(CONDITIONAL_NEW_TAB_PAGE_KEY)
  return (
    <>
      <Setting
        label={t('subscribe')}
        type="button"
        value={t('more-info')}
        alt={
          user.isSubscribed
            ? t('thanks-support')
            : t('get-more-access')
        }
        onChange={openUpsell}
      />
      {children}
      <Setting
        label={t('conditional-new-tab-page')}
        type="boolean"
        alt={t('conditional-new-tab-page-alt')}
        onChange={setConditionalNewTabPageEnabled}
        value={conditionalNewTabPageEnabled}
      />
      <Setting
        label={t('breath-amount')}
        type="number"
        alt={t('want-more-breath', {
          min: BREATH_MIN,
          max: BREATH_MAX,
        })}
        onChange={setBreath}
        value={breathAmount}
      />
      <Setting
        label={t('help')}
        type="button"
        alt={t('join-chat')}
        onChange={openSupport}
        value={t('get-support')}
      />
      <Setting
        label={t('about-mujo')}
        type="button"
        alt={t('mujo-version', { version: VERSION })}
        onChange={openWebstore}
        value={t('rate-us')}
      />
    </>
  )
}
