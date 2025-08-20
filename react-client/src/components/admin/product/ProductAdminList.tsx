import ProductFormModal from './ProductFormModal'
import ProductTable from './ProductTable'
import ProductFilterBar from './ProductFilterBar'

const ProductAdminList = () => {
  return (
    <div>
      <h1>Product Admin List</h1>
      <p>This is the admin list for managing products.</p>
      <ProductFilterBar />
      <ProductTable />
      <ProductFormModal />
      {/* Additional components and logic for managing products can be added here */}
    </div>
  )
}

export default ProductAdminList
