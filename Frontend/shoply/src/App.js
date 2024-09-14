import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Navbar} from "./components/navbar"
import { ProductProvider } from './contexts/productContext';
import ProductList from './components/productList';
import { ShopContextProvider } from './contexts/shopContext';
import { CartPage } from './pages/CartPage';
import HomePage from './pages/HomePage';
function App() {
  return (
    <ProductProvider>
      <ShopContextProvider>
      <div className="App">
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/login"/>
            <Route path="/register"/>
          </Routes>
        </Router>
      </div>
      </ShopContextProvider>
    </ProductProvider>
  
  );
}

export default App;
