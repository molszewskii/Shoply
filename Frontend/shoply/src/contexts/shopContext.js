import { createContext, useContext, useEffect, useState } from "react";
import { useProducts } from "./productContext";


const ShopContext = createContext();

export const useShopContext = () => useContext(ShopContext);

export const ShopContextProvider = ({children}) =>{
    const [cartItems, setCartItems] = useState({});
    const {products} = useProducts();

    useEffect(()=>{
        const initialCart = {};
        products.forEach(product => {
            initialCart[product.id] = 0;
        })
        setCartItems(initialCart);
    },[products])

    const addItemToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
    };

    const removeItemFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
        }));
    };
    console.log(cartItems)
    return(
        <ShopContext.Provider value={{cartItems, addItemToCart, removeItemFromCart}}>
            {children}
        </ShopContext.Provider>
    )
}