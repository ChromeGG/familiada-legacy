import { TeamId } from '@familiada/shared-interfaces'
import { useQuery } from 'react-query'
import { httpClient } from '../core/httpClient'

export type ServerStateKeys = 'game'

export const getTeam = async (id: TeamId) => {
  console.log('~ TeamID', id)
  const response = await httpClient.get(`/api/teams/${id}`)
  return response.data
}

export const useGetTeam = (id: TeamId) => {
  return useQuery(['game', id], () => getTeam(id))
}
