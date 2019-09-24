import { SUBSCRIBE_FEATURE } from '../../constants'

export const maxBreaktimers = ({ url, onClick }, _, { t }) => {
  if (SUBSCRIBE_FEATURE) {
    return {
      title: t('mindful-max'),
      description: t('max-break-timers-sub', { url }),
      button: {
        children: t('sub-details'),
        onClick,
      },
    }
  }
  return {
    title: t('mindful-max'),
    description: t('max-break-timers'),
  }
}
