import { Player, PlayerId } from '@familiada/shared-interfaces'
import { httpClient } from '../core/httpClient'

export const getPlayer = async (id: PlayerId) => {
  const response = await httpClient.get<Player>(`/api/players/${id}`)
  return response.data
}
