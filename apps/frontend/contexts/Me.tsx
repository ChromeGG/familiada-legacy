import { Player } from '@familiada/shared-interfaces'
import { useSessionStorageValue } from '@react-hookz/web'

export const useMe = () =>
  useSessionStorageValue<Player | undefined>('me', undefined, {
    initializeWithStorageValue: false,
  })
