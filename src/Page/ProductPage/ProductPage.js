import { ProductList } from "../../Component";
import { productList } from "../../Database";

const ProductPage = () => {
    return <ProductList products={productList} />
}

export default ProductPage;