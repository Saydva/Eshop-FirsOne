import ProductList from "../product/productList/ProductList";

const AppBody = () => {
  return (
    <div className="flex flex-row flex-wrap gap-3 justify-center max-h-max">
      <ProductList />
    </div>
  );
};

export default AppBody;
