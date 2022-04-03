import { CreateGameDTO } from '@familiada/shared-interfaces'
import { useMutation, useQuery } from 'react-query'
import { httpClient } from '../core/httpClient'

export type ServerStateKeys = 'game'

export const useGetGame = (gameId: string) => {
  return useQuery('game')
}

export const useCreateGameMutation = () =>
  useMutation(({ gameName, playerName, team }: CreateGameDTO) =>
    httpClient.post('/games/create', { gameName, playerName, team })
  )
