import { Player } from '@familiada/shared-interfaces'
import { useLocalStorageValue } from '@react-hookz/web'

export const useMe = () =>
  useLocalStorageValue<Player | undefined>('me', undefined, {
    initializeWithStorageValue: false,
  })
