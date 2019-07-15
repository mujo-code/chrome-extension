import { SUBSCRIBE_FEATURE } from '../../constants'

export const maxBreaktimers = ({ url, onClick }) => {
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
        children: 'Subscription Details',
        onClick,
      },
    }
  }
  return {
    title: 'Mindful to the max',
    description: ['You have set the max number of break timers.'],
  }
}
