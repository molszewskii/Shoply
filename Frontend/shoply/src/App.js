import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Navbar} from "./components/navbar"
import { CartPage } from './pages/CartPage';
import HomePage from './pages/HomePage';
import { Provider } from 'react-redux';
import store from './redux/store'
function App() {
  return (
    <Provider store={store}>
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
      </Provider>
  
  );
}

export default App;
