import { createApi } from '@/../utils/api.axios'
export type Product = {
  _id: string
  name: string
  description: string
  price: number
  categoryId: string
  stockQuantity: number
}

const { api } = createApi('product')

export const createProduct = async (product: Product) => {
  return await api.post('/create', product)
}

export const getAllProducts = async () => {
  return await api.get('/')
}

export const getProductById = async (id: string) => {
  return await api.get(`/${id}`)
}

export const updateProduct = async (id: string, product: Product) => {
  return await api.put(`/${id}`, product)
}

export const deleteProduct = async (id: string) => {
  return await api.delete(`/${id}`)
}
