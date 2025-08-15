import { createApi } from '../../utils/api.axios'

const { api } = createApi('auth')

export const registerService = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const response = await api.post('/register', { name, email, password, role })
  return response.data
}

export const loginService = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password })
  return response.data
}

export const refreshService = async (refreshToken: string) => {
  const response = await api.post('/refresh', { refreshToken })
  return response.data
}

export const logoutService = async (userId: string) => {
  const response = await api.post(`/logout/${userId}`)
  return response.data
}
