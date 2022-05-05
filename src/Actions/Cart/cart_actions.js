import Cookies from "js-cookie";
import { CART_COOKIE } from "../../Const";
import { cartProducts, cartProducts2, clear, getProduct, removeItemFromCart, totalPrice, totalProductInCart, updateCart, updateItemCount } from "../../Helper";

export const AddItems = ({id, price, count = 1}) => {
    console.log("This is the item : " , {
        id,
        price,
        count
    });
    updateCart({id, price, count});
    return;
}

export const ShowCart = () => {
    window.location.href = "/cart";
    console.log(Cookies.get(CART_COOKIE));
}

export const ShowCartProduct = async () => {
    // console.log(await cartProducts());
    // console.log("hello");
    return await cartProducts();
}

export const ShowCartProductNoPromise = () => {
    return cartProducts2();
}

export const GetProductAva = (id) => {
    return getProduct(id).images;
}

export const GetProductName = (id) => {
    return getProduct(id).name;
}

export const totalMoney = () => {
    return totalPrice();
}

export const UpdateCartItemCount = (id, value) => {
    updateItemCount(id, value);
}

export const totalCart = () => {
    return totalProductInCart();
}

export const RemoveItem = (id) => {
    removeItemFromCart(id)
}

export const ClearCart = () => {
    clear();
}