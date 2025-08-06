import ProductCard from "../productCard/ProductCard";

const ProductList = () => {
  return (
    <div className="flex flex-wrap gap-1 justify-center">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
};

export default ProductList;
