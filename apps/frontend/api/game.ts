import {
  CreateGameDTO,
  Game,
  GameId,
  JoinToGameDTO,
  Player,
} from '@familiada/shared-interfaces'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { httpClient } from '../core/httpClient'

export type ServerStateKeys = 'game'

export const getGame = async (id: GameId) => {
  const response = await httpClient.get<Game>(`/api/games/${id}`)
  return response.data
}

export const useGetGame = (id: GameId) => {
  return useQuery(['game', id], () => getGame(id))
}
export const useGame = () => {
  const client = useQueryClient()
  return client.getQueryData<Game>('game')
}

export const useCreateGameMutation = () =>
  useMutation(async ({ gameName, playerName, playerTeam }: CreateGameDTO) => {
    const { data } = await httpClient.post<Game>('/api/games/create', {
      gameName,
      playerName,
      playerTeam,
    })
    return data
  })

export const useJoinToGameMutation = () =>
  useMutation<Player, unknown, JoinToGameDTO>(async (payload) => {
    {
      const { data } = await httpClient.post<Player>('/api/games/join', payload)
      return data
    }
  })
