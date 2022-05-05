import { createContext } from "react";

export const CartContext = createContext();
const CartProvider = CartContext.Provider;
export { CartProvider };

export const CartTotalPriceContext = createContext();
const CartPriceProvider = CartTotalPriceContext.Provider;
export { CartPriceProvider };