import { Player } from '@familiada/shared-interfaces'
import { createContext } from 'react'

export const PlayerContext = createContext<Player>({ id: 1 })
