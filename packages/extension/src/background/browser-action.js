import { Extension } from '@mujo/utils'

const { tabs, runtime } = Extension

export const onBrowserAction = () => {
  const url = runtime.getURL('../../index.html')
  tabs.create({ url })
}
