import { AppSocket } from '@familiada/shared-interfaces'
import { createContext, Dispatch, SetStateAction, useContext } from 'react'

interface SocketContextI {
  socket: AppSocket | null
  setSocket: Dispatch<SetStateAction<AppSocket>>
}

export const SocketContext = createContext<SocketContextI>({
  socket: null,
  setSocket: () => '',
})
export const useSocketContext = () => useContext<SocketContextI>(SocketContext)
