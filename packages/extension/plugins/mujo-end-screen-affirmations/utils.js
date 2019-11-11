export const TIMEOUT = 5000

export const randomN = n => Math.floor(Math.random() * n)

export const getRandomAffirmation = (t, i) => {
  const messages = [
    t('youre-amazing'),
    t('youre-mindful'),
    t('youre-the-best'),
    t('youre-pro'),
  ]
  const number = typeof i === 'number' ? i : randomN(messages.length)
  return messages[number]
}
