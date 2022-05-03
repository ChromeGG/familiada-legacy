import { PlayerId } from '@familiada/shared-interfaces'
import { useQuery } from 'react-query'
import { httpClient } from '../core/httpClient'

export const getMe = async (id: PlayerId) => {
  const response = await httpClient.get(`/api/players/${id}`)
  return response.data
}

export const useMe = (id: PlayerId) => {
  return useQuery('me', () => getMe(id))
}
