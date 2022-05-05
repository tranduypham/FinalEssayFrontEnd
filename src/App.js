import { createContext, useContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { totalCart, totalMoney } from './Actions';
import './App.css';
import { ProductList, WebLayout } from './Component';
import { CartPriceProvider, CartProvider } from './Context';
import { ShoppingCartPage, ProductPage } from './Page';

// import { productList } from './Database';


// const productList = [
//   { id: 1, name: "Soap", price: 10, images: _soapImg },
//   { id: 2, name: "Shampoo", price: 15, images: _shampooImg },
//   { id: 3, name: "Moisterizer", price: 5, images: _moistImg },
//   { id: 4, name: "Sun Screen", price: 20, images: _sunScreenImg },
//   { id: 5, name: "Clenser", price: 19, images: _cleanserImg },
//   { id: 6, name: "Removel Oil", price: 14, images: _removelOilImg },
// ]

function App() {
  const [cartTotal, setCartTotal] = useState(totalCart());
  const [totalPrice, setTotalPrice] = useState(totalMoney());



  return (
    <BrowserRouter>

      <div className="App">
        <CartPriceProvider value={[totalPrice, setTotalPrice]}>
          <CartProvider value={[cartTotal, setCartTotal]}>
            <WebLayout totalProductInCart={cartTotal}>
              <Routes>
                {/* <ProductList products={productList} /> */}
                <Route path="/" element={<ProductPage />}>
                </Route>
                <Route path="/cart" element={<ShoppingCartPage />}>
                </Route>
              </Routes>
            </WebLayout>
          </CartProvider>
        </CartPriceProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
