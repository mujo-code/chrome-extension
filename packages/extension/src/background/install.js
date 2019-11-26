import { Extension } from '@mujo/utils'
import { track } from './tracking'

const { runtime, tabs } = Extension

export const onInstall = details => {
  const currentVersion = runtime.getManifest().version
  const { previousVersion } = details
  const { reason } = details

  console.log(`Install: ${reason} event`)

  switch (reason) {
    case 'install':
      track({
        category: 'life-cycle',
        action: 'install',
        label: currentVersion,
      })

      tabs.create({
        url: runtime.getURL(
          '../../index.html?play=true&type=install'
        ),
      })
      break
    case 'update':
      track({
        category: 'life-cycle',
        action: 'update',
        label: `${previousVersion}->${currentVersion}`,
      })
      break
    default:
      break
  }
}
