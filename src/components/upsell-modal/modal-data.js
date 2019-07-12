import { SUBSCRIBE_FEATURE } from '../../constants'
import { identity } from '../../lib/functional'

const modals = {
  breakTimerMax: ({ url, onClick }) => {
    if (SUBSCRIBE_FEATURE) {
      return {
        title: 'Mindful to the max',
        description: [
          'You have set the max number of break timers.',
          [
            'To get access to unlimited break timers',
            `and add a break timer for ${url}`,
            'subscribe to Mujō.',
          ].join(' '),
        ],
        button: {
          children: 'Subscribe',
          onClick,
        },
      }
    }
    return {
      title: 'Mindful to the max',
      description: ['You have set the max number of break timers.'],
    }
  },
}

export const getModalData = context => {
  const modalData = modals[context.name] || identity
  return modalData(context)
}
