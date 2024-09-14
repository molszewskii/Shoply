import { CartItemCard } from "../components/cartItemCard";
import { useProducts } from "../contexts/productContext";
import { useShopContext } from "../contexts/shopContext"

export const CartPage = () =>{
    const {cartItems} = useShopContext();
    const {products} = useProducts();
    console.log(cartItems)
    return(
        <div className=" flex flex-col items-center mt-3">
            <p></p>
            {products.map((product)=>{
                if(cartItems[product.id] !== 0){
                    return(
                    <CartItemCard key={product.id} id={product.id} productName={product.name} price={product.price} productImage={product.imagePath} amount={cartItems[product.id]} />
                    )
                }      
            })}
        </div>
    )
}