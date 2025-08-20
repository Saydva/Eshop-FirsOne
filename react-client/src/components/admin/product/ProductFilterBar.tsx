const ProductFilterBar = () => {
  return (
    <div className='product-filter-bar'>
      <h2>Filter Products</h2>
      <form>
        <label htmlFor='category'>Category:</label>
        <select id='category' name='category'>
          <option value='all'>All</option>
          <option value='electronics'>Electronics</option>
          <option value='clothing'>Clothing</option>
          <option value='home-appliances'>Home Appliances</option>
        </select>

        <label htmlFor='price-range'>Price Range:</label>
        <input
          type='text'
          id='price-range'
          name='price-range'
          placeholder='$0 - $1000'
        />

        <button type='submit'>Apply Filters</button>
      </form>
    </div>
  )
}

export default ProductFilterBar
