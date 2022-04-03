import axios from 'axios'
import { QueryClient } from 'react-query'
import { config } from '../configuration'

const { apiUrl } = config

export const httpClient = axios.create({
  baseURL: apiUrl,
  responseType: 'json',
})

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await httpClient.get(`${apiUrl}/api${queryKey[0]}`)
  return data
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 10, // 10 seconds
    },
  },
})
