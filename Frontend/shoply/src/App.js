import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Navbar} from "./components/navbar"
import { CartPage } from './pages/CartPage';
import HomePage from './pages/HomePage';
import { Provider } from 'react-redux';
import store from './redux/store'
import { LoginPage } from './pages/LoginPage';
function App() {
  return (
    <Provider store={store}>
      <div className="App flex flex-col min-h-screen">
        <Router>
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" />
            </Routes>
          </div>
        </Router>
      </div>
    </Provider>
  );
  
}

export default App;
