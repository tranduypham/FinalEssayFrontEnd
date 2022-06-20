import { useEffect } from "react";
import { ProductList } from "../../Component";
import { productList } from "../../Database";
import { useNavigate } from "react-router-dom";
import { ClientVerifiedItSelf } from "../../Axios";

const ProductPage = () => {
    const navigator = useNavigate()
    useEffect(() => {
        ClientVerifiedItSelf("")
        .then(res => {
            if(res.data == false) {
                navigator("/pin")
            }
        })
    }, []);
    return <ProductList products={productList} />
}

export default ProductPage;