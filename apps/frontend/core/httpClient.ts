import axios from 'axios'
import { config } from '../configuration'

const { apiUrl } = config
console.log('~ apiUrl', apiUrl)
const instance = axios.create({
  baseURL: apiUrl,
  responseType: 'json',
  headers: { Accept: 'application/json' },
})

export const httpClient = instance
