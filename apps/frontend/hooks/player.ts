import { Player, PlayerId } from '@familiada/shared-interfaces'
import { useQuery, useQueryClient } from 'react-query'
import { httpClient } from '../core/httpClient'

export const getMe = async (id: PlayerId) => {
  const response = await httpClient.get<Player>(`/api/players/${id}`)
  return response.data
}

export const useMe = () => {
  const client = useQueryClient()
  const me = client.getQueryData<Player>('me')
  return me
  // return useQuery('me', () => getMe(id))
}
