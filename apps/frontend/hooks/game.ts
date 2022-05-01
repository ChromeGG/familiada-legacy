import { CreateGameDTO, GameId } from '@familiada/shared-interfaces'
import { useMutation, useQuery } from 'react-query'
import { httpClient } from '../core/httpClient'
import { JoinToGameInput } from '../validation/game'

export type ServerStateKeys = 'game'

export const getGame = async (id: GameId) => {
  console.log('~ GameId', id)
  const response = await httpClient.get(`/api/games/${id}`)
  return response.data
}

export const useGetGame = (id: GameId) => {
  return useQuery(['game', id], () => getGame(id))
}

export const useCreateGameMutation = () =>
  useMutation(({ gameName, playerName, playerTeam }: CreateGameDTO) =>
    httpClient.post('/api/games/create', { gameName, playerName, playerTeam })
  )

export const useJoinToGameMutation = () =>
  useMutation((payload: JoinToGameInput) =>
    httpClient.post('/api/games/join', payload)
  )
