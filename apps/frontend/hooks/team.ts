import { TeamId } from '@familiada/shared-interfaces'
import { useQuery } from 'react-query'
import { httpClient } from '../core/httpClient'

export const getTeam = async (id: TeamId) => {
  const response = await httpClient.get(`/api/teams/${id}`)
  return response.data
}

export const useGetTeam = (id: TeamId) => {
  return useQuery(['team', id], () => getTeam(id))
}
