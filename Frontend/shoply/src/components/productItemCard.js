import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../redux/slices/cartSlice';

export const ProductItemCard = (props) => {
  const {id, productName, price, productImage} = props;
  const dispatch = useDispatch();
  const cartItems = useSelector(state=>state.cart)

  const handleAddItem=()=>{
    dispatch(addItemToCart(id))
  }
  return (
    <div key={id} className="border rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105">
        <img 
        src={productImage} 
        alt={productName} 
        className="w-full h-72 object-contain mb-4 rounded"
        />
        <h2 className="text-lg font-semibold mb-2">{productName}</h2>
        <p className="text-gray-700">${price}</p>
        <div className="w-full flex flex-col sm:flex-row justify-evenly mt-3">
        <button className="text-white bg-black p-2 rounded flex-1 sm:flex-none hover:bg-gray-800 whitespace-normal overflow-wrap break-word min-w-[100px] max-w-[150px] text-center">
            Buy Now
        </button>
        <button
            className="text-black bg-yellow-300 p-2 rounded flex-1 sm:flex-none hover:bg-yellow-400 whitespace-normal overflow-wrap break-word min-w-[100px] max-w-[150px] text-center"
            onClick={handleAddItem}
        >
            Add to Cart {cartItems[id] > 0 && <>({cartItems[id]})</>}
        </button>
        </div>
    </div>
  )
}
