import { Player } from '@familiada/shared-interfaces'
import { createContext, Dispatch, SetStateAction, useContext } from 'react'

interface PlayerContextI {
  player: Player | null
  setPlayer: Dispatch<SetStateAction<Player>>
}

export const PlayerContext = createContext<PlayerContextI>({
  player: null,
  setPlayer: () => '',
})
export const usePlayerContext = () => useContext<PlayerContextI>(PlayerContext)
