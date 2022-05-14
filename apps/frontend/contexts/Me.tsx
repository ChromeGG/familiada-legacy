import { Player } from '@familiada/shared-interfaces'
import { useLocalStorageValue } from '@react-hookz/web'

interface Me extends Player {
  isSupervisor: boolean
}

export const useMe = () =>
  useLocalStorageValue<Me | undefined>('me', undefined, {
    initializeWithStorageValue: false,
  })
