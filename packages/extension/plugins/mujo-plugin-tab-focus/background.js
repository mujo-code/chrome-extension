import { useMessage } from '@mujo/plugins'
import { Extension } from '@mujo/utils'

export const TabFocusBackground = () => {
  useMessage(({ request, sender, sendResponse }) => {
    const { event } = request

    if (event === 'open new tab with focus') {
      const options = { url: request.url, active: !request.shiftKey }
      Extension.tabs.create(options, () => {
        if (request.shiftKey) {
          Extension.tabs.update(sender.tab.id, { active: true })
        }
      })
    }
  })

  return null
}
