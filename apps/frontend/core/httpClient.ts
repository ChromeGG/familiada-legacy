import axios from 'axios'
import { config } from '../configuration'

const { apiUrl } = config
const instance = axios.create({
  baseURL: apiUrl,
})

export const httpClient = instance
