import { useSelector } from "react-redux";
import { CartItemCard } from "../components/cartItemCard";

export const CartPage = () =>{
    const cartItems = useSelector(state=>state.cart)
    const products = useSelector(state=>state.products.products)
    console.log(cartItems)
    console.log(products)
    return(
        <div className=" flex flex-col items-center mt-3">
            {products.map((product)=>{
                if(cartItems[product.id] > 0){
                    return(
                    <CartItemCard key={product.id} id={product.id} productName={product.name} price={product.price} productImage={product.imagePath} amount={cartItems[product.id]} />
                    )
                }      
            })}
        </div>
    )
}