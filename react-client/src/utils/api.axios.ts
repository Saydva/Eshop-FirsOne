import axios from 'axios'

export const createApi = (route: string) => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL + '/' + route,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  api.interceptors.request.use(
    (config) => {
      const storage = sessionStorage.getItem('user-storage') || '{}'
      const token = JSON.parse(storage)?.state?.accessToken || null
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  return { api }
}
