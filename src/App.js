import './App.css';
import { Home } from './Pages/Home';
import { Cart } from './Pages/Cart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, createContext} from "react";

export const AppContext = createContext();

function App() {
    const [item, setItem] = useState([]);
    const [cart, setCart] = useState(0);
    const [total, setTotal] = useState(0);

    
    const addToCart = (cartItem) => {
        if (!cartItem.qty) {
            cartItem.qty = 1
            cartItem.subTotal = cartItem.qty * cartItem.price
        } else {
            cartItem.qty++
            cartItem.subTotal = cartItem.qty * cartItem.price
        }

        let data = { id: cartItem.id, item: cartItem }
        if (!item.length) {
            item.push(data);
        }
        let shouldAdd = true
        item.map((value) => {
            if (value.id === cartItem.id) {
                shouldAdd = false
            }
            return shouldAdd
        })
        if (shouldAdd) {
            item.push(data);
        }

        let itemarr = item.length;
        setCart(itemarr);
    }
    return (
        <div className="App">
            <AppContext.Provider value={{ item, setItem, cart, setCart, addToCart, total, setTotal }}>
                <Router>
                    <div className='header'>
                        <div className='header_spacing'>
                            <div className='head'>
                                <h1>TUKKIE'S STORE</h1>
                            </div>
                        </div>
                    </div>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='*' element={<h1>PAGE NOT FOUND</h1>} />

                    </Routes>
                    <div className='footer'>
                        <h4>2022 © Tukkie's Store. All rights reserved</h4>
                    </div>
                </Router>
            </AppContext.Provider>
        </div>
    );
}

export default App;
