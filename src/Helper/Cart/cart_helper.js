import Cookies from 'js-cookie';
import { CART_COOKIE, CART_ITEMS_DELIMETER } from '../../Const';
import { productList } from '../../Database';


console.log("hello");
export const totalProductInCart = () => {
    const cart = Cookies.get(CART_COOKIE);
    if (cart !== null && cart !== undefined && isNaN(cart) && cart !== "") {
        // console.log("Cart not empty: " + cart);
        return parseStringfyArray(cart).length;
    }
    else {
        Cookies.set(CART_COOKIE, "", { expires: 7 });
        // console.log("Cart IS empty: " + cart);
        return 0;
    }
}

export const updateCart = ({ id, price, amount = 1 }) => {
    const item =
    {
        id: id,
        price: price,
        amount: amount,
    }
    const cart = Cookies.get(CART_COOKIE);
    if (cart !== null && cart !== undefined && isNaN(cart) && cart !== "") {

    }
    else {
        Cookies.set(CART_COOKIE, "", { expires: 7 });
        console.log("Cart IS empty");
    }
    console.log("Adding item into card: ", item);
    const currentAmount = countItems(id);
    const list = parseStringfyArray(cart);
    let newList;
    console.log(`Product with id ${id} currently has ${currentAmount} items in cart`);
    if (currentAmount !== 0) {
        newList = list.map(item => {
            return item.id === id ? {
                ...item,
                amount: currentAmount + amount
            } : item
        });
    }
    else {
        newList = [...list].concat([item]);
    }
    console.log(newList);
    Cookies.set(CART_COOKIE, stringfyArray(newList), {expires: 7});
}

export const totalPrice = () => {
    const cart = Cookies.get(CART_COOKIE);
    if (cart !== null && cart !== undefined && isNaN(cart) && cart !== "") {
        const list = parseStringfyArray(cart);
        let total = 0;
        list.map(item => {
            total += item.price * item.amount
        })
        return total;
    }
    else {
        Cookies.set(CART_COOKIE, "", { expires: 7 });
        // console.log("Cart IS empty: " + cart);
        return 0;
    }
}

export const cartProducts = async () => {
    try {
        const cart = await checkCartPromis;
        const list = parseStringfyArray(cart);
        // console.log("List trong promise : ", list);
        return list;
    } catch {
        return [];
    }
}

export const cartProducts2 = () => {
    try {
        return checkCartPromis2(
            (cart) => {
                const list = parseStringfyArray(cart);
                console.log("List trong none-promise : ", list);
                return list;
            }
        )
    } catch {
        return [];
    }
}

export const getProduct = (id) => {
    const product = productList.find((item) => {
        return item.id === id;
    });
    return product;
}

export const updateItemCount = (id, value) => {
    try{
        checkCartPromis2(
            (cart) => {
                console.log(value);
                console.log(id);
                const list = parseStringfyArray(cart);
                const newList = list.map((item) => {
                    if(item.id === id){
                        const temp = item;
                        return {
                            ...temp,
                            amount: value
                        }
                    }
                    return item;
                })
                saveCart(newList);
            }
        )
    }catch {

    }
}

export const removeItemFromCart = (id) => {
    try{
        checkCartPromis2(
            (cart) => {
                console.log(id);
                const list = parseStringfyArray(cart);
                const newList = list.filter((item) => {
                    return item.id !== id;
                })
                saveCart(newList);
            }
        )
    }catch {

    }
}

export const clear = () => {
    Cookies.remove(CART_COOKIE);
}

const saveCart = (arr) => {
    Cookies.set(CART_COOKIE, stringfyArray(arr), {expires: 7})
}

const checkCartPromis = new Promise((resolveFunc) => {
    const cart = Cookies.get(CART_COOKIE);
    if (cart !== null && cart !== undefined && isNaN(cart) && cart !== "") {
        console.log("Cart not empty: " + cart);
        resolveFunc(cart);
    }
    else{
        Cookies.set(CART_COOKIE, "", { expires: 7 });
        console.log("Cart IS empty: " + cart);
        throw Error("Cart is empty");
    }
})

const checkCartPromis2 = ((resolveFunc, rejectFunc) => {
    const cart = Cookies.get(CART_COOKIE);
    if (cart !== null && cart !== undefined && isNaN(cart) && cart !== "") {
        console.log("Cart not empty: " + cart);
        return resolveFunc(cart);
    }
    else{
        Cookies.set(CART_COOKIE, "", { expires: 7 });
        console.log("Cart IS empty: " + cart);
        throw Error("Cart is empty");
    }
})

const stringfyArray = (array) => {
    return array.map(item => {
        let { id, price, amount } = item;
        return `${id}-${price}-${amount}`;
    }).join(CART_ITEMS_DELIMETER);
}

const parseStringfyArray = (stringfyArray) => {
    if(stringfyArray.length > 0){
        return stringfyArray
        .split(CART_ITEMS_DELIMETER)
        .map(item => {
            let temp = item.split("-").map(item => parseInt(item));
            return {
                id: temp[0],
                price: temp[1],
                amount: temp[2]
            }
        })
    }
    return [];
}

const countItems = (id) => {
    console.log("-----------------------------------")
    console.log(`Product id is ${id}`)
    const list = parseStringfyArray(Cookies.get(CART_COOKIE));
    console.log(`Current List`, list)
    const product = list.find((item) => {
        return item.id === id;
    });
    const amount = parseInt(product?.amount);
    console.log(`Current Product `, product)
    console.log(`Current Amount `, amount)
    console.log("-----------------------------------")
    return isNaN(amount) ? 0 : amount;
}