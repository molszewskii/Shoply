import { useSelector } from "react-redux";
import { CartItemCard } from "../components/cartItemCard";
import { useEffect, useState } from "react";
import { CartPageNavbar } from "../components/cartPageNavbar";

export const CartPage = () =>{
    const cartItems = useSelector(state=>state.cart)
    const products = useSelector(state=>state.products.products)
    const [finalPrice,setFinalPrice] = useState(0);
    const [currentStep, setCurrentStep] =useState(1);

    console.log(cartItems)
    console.log(products)
    useEffect(()=>{
        if(cartItems && products){
            let prices = 0;
            const cartProducts = products.filter(product => cartItems[product.id])
            cartProducts.forEach(product => {
                prices += product.price * cartItems[product.id];
            });
            setFinalPrice(prices.toFixed(2));
        }
    },[cartItems,products])

    const goToNextStep =()=>{
        if(currentStep < 4){
            setCurrentStep(currentStep + 1)
        }
    }
    const goToPreviousStep=()=>{
        if(currentStep > 1){
            setCurrentStep(currentStep - 1)
        }
    }
    return(
        <div className=" flex flex-col items-center">
            <CartPageNavbar currentStep={currentStep}/>
            {currentStep === 1 && (
                <>
                    {products.map((product)=>{
                        if(cartItems[product.id] > 0){
                            return(
                            <CartItemCard key={product.id} id={product.id} productName={product.name} price={product.price} productImage={product.imagePath} amount={cartItems[product.id]} />
                            )
                        }
                        return null;      
                    })}
                    <button className="bg-black text-white border rounded-lg p-4 shadow-lg w-4/5 mb-3 transition-transform transform hover:scale-105 hover:bg-gray-900 flex items-center justify-center"
                        disabled={finalPrice == 0.00}
                        onClick={goToNextStep}
                    >
                            <p>
                                Final Price: ${finalPrice}
                            </p>
                            <p className="ml-auto text-xl">
                                {"Next >"}
                            </p>
                    </button>
                </>
            )}
           
            

        </div>
    )
}