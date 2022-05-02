import './App.css';
import { ProductList, WebLayout } from './Component';

const _soapImg = "https://soapwithjoy.com/wp-content/uploads/2021/06/huong-dan-cach-lam-xa-phong-yen-mach-diu-nhe-cho-da-320x400.jpg"
const _shampooImg = "https://d2j6dbq0eux0bg.cloudfront.net/images/12969236/2979143375.jpg"
const _MoistImg = "https://myphamau.com/wp-content/uploads/2019/07/1-320x400.jpg"
const _sunScreenImg = "https://i.pinimg.com/474x/a4/56/3e/a4563ebea7d8f163bc892973df1597ea.jpg"
const _cleanserImg = "https://d2j6dbq0eux0bg.cloudfront.net/images/29684045/1491427777.jpg"
const _romovelOilImg = "https://images.prod.meredith.com/product/527f39a4bd2877ca34795c11c7d698ba/1614938783126/l/innisfree-hydrating-cleansing-oil-with-green-tea-5-07-fl-oz"


const productList = [
  { id: 1, name: "Soap", price: 10, images: _soapImg},
  { id: 2, name: "Shampoo", price: 15, images: _shampooImg},
  { id: 3, name: "Moisterizer", price: 5, images: _MoistImg},
  { id: 4, name: "2NE1", price: 20, images: _sunScreenImg},
  { id: 5, name: "T-ARA", price: 19, images: _cleanserImg},
  { id: 6, name: "Super Junior", price: 14, images: _romovelOilImg},
]

function App() {



  return (
    <div className="App">
      <WebLayout>
        <ProductList products={productList}/>
      </WebLayout>
    </div>
  );
}

export default App;
