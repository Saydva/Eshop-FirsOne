import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from './productAdmin.service'
import type { Product } from './productAdmin.service'

export const newProduct = async (product: Product) => {
  try {
    const response = await createProduct(product)
    return response.data
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}
export const fetchAllProducts = async () => {
  try {
    const response = await getAllProducts()
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}
export const fetchProductById = async (id: string) => {
  try {
    const response = await getProductById(id)
    return response.data
  } catch (error) {
    console.error('Error fetching product by ID:', error)
    throw error
  }
}
export const modifyProduct = async (id: string, product: Product) => {
  try {
    const response = await updateProduct(id, product)
    return response.data
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}
export const removeProduct = async (id: string) => {
  try {
    const response = await deleteProduct(id)
    return response.data
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}
