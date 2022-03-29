export const isProduction = process.env.NODE_ENV === 'production'

export const config = {
  apiUrl: process.env.API_URL,
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
}
