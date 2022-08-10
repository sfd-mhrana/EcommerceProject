import {
  BrowserRouter,
  Route, Routes
} from "react-router-dom";

import HeaderSection from './components/headersection/HeaderSection';
import FooterSection from './components/footersection/FooterSection';
import HomePage from './components/mainbody/HomePage';
import Product from './components/mainbody/Product';
import { CookiesProvider } from 'react-cookie';
import CartList from "./components/mainbody/CartList";
import WishList from "./components/mainbody/WishList";

function App() {

  return (
    <div className='main_container'>
      <CookiesProvider>
        <BrowserRouter>
          <HeaderSection />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/product" element={<Product />}></Route>
            <Route path="/cart" element={<CartList />}></Route>
            <Route path="/wish" element={<WishList />}></Route>
          </Routes>
          <FooterSection />
        </BrowserRouter>
      </CookiesProvider>
    </div>
  );
}

export default App;
