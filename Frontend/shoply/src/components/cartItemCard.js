import React from 'react'
import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../redux/slices/cartSlice';

export const CartItemCard = (props) => {
    const {id, productName, price, productImage, amount} = props;
    const dispatch = useDispatch();

    const handleAddItem=()=>{
        dispatch(addItemToCart(id));
    }

    const handleRemoveItem=()=>{
        dispatch(removeItemFromCart(id));
    }

    return (
        <div key={id} className="border rounded-lg p-4 shadow-lg w-4/5 mb-3">
            <img 
                src={productImage} 
                alt={productName} 
                className="w-full h-52 object-contain mb-4 rounded"
            />
            <h2 className="text-lg font-semibold">{productName}</h2>
            <p className="text-gray-700">${price}</p>
            <div className='flex justify-center items-center'>
                <p className='p-2 text-xl' onClick={handleRemoveItem}>-</p>
                <p className='w-8 h-8 border rounded shadow-lg flex items-center justify-center'>{amount}</p>
                <p className='p-2 text-xl' onClick={handleAddItem}>+</p>
            </div>
            <button className="text-white bg-black p-2 rounded w-1/3 mt-3">Buy Now (${(price*amount).toFixed(2)})</button>
        </div>
    )
}
