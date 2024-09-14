import { createContext, useContext, useEffect, useState } from "react";
import productService from "../services/productService";

const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const loadProducts = async () =>{
            try{
                const data = await productService.fetchProducts();
                setProducts(data);
            }catch(error){
                setError("Failed to fetch products");
            }finally{
                setLoading(false);
            }
        }
        loadProducts();
    },[])

    return (
        <ProductContext.Provider value={{products, loading, error}}>
            {children}
        </ProductContext.Provider>
    )
};

export const useProducts = () =>{
    const context = useContext(ProductContext);
    if(context === undefined){
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
}