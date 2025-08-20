import { useEffect, useState } from 'react'
import { Delete, Edit, ZoomIn } from 'react-feather'
import {
  newProduct,
  fetchAllProducts,
  fetchProductById,
  modifyProduct,
  removeProduct,
} from './productAdmin.controller'
import { deleteProduct, type Product } from './productAdmin.service'

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchAllProducts()
      .then((res) => setProducts(res))
      .finally(() => setLoading(false))
  }, []) // Fetch products from API here

  if (loading) return <div>Načítavam produkty...</div>

  return (
    <div>
      <div className='flex flex-row justify-between items-center mb-4'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type='checkbox' className='checkbox' />
                </label>
              </th>
              <th>Name</th>
              <th>id</th>
              <th>description</th>
              <th>category</th>
              <th>price</th>
              <th>stock Q.</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6}>No Products</td>
              </tr>
            ) : (
              products.map(
                (product) => (
                  console.log(product),
                  (
                    <tr key={product._id}>
                      <th>
                        <label>
                          <input type='checkbox' className='checkbox' />
                        </label>
                      </th>
                      <td>
                        <div className='flex items-center gap-3'>
                          <div className='avatar'>
                            <div className='mask mask-squircle h-12 w-12'>
                              <img
                                src='https://img.daisyui.com/images/profile/demo/2@94.webp'
                                alt='Avatar Tailwind CSS Component'
                              />
                            </div>
                          </div>
                          <div>
                            <div className='font-bold'>{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>{product._id}</td>
                      <td>{product.description}</td>
                      <td>
                        <span className='badge badge-ghost badge-sm'>
                          {product.categoryId}
                        </span>
                      </td>
                      <td>{product.price}</td>
                      <td>{product.stockQuantity}</td>
                      <td>
                        <div className='flex flex-col'>
                          <button>
                            <ZoomIn />
                          </button>
                          <button>
                            <Edit />
                          </button>
                          <button
                            onClick={() => {
                              deleteProduct(product._id)
                              fetchAllProducts().then((res) => setProducts(res))
                            }}
                          >
                            <Delete />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductTable
