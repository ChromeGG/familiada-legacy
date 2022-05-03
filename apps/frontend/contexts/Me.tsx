import { Player } from '@familiada/shared-interfaces'
import { createContext, Dispatch, SetStateAction, useContext } from 'react'

interface IMeContext {
  me: Player | null
  setMe: Dispatch<SetStateAction<Player>>
}

export const MeContext = createContext<IMeContext>({
  me: null,
  setMe: () => '',
})
export const useMe = () => useContext<IMeContext>(MeContext)
