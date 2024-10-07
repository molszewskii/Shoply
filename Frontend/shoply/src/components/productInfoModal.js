import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/slices/cartSlice';
import { Notification } from './notification';
import { CheckCircleIcon } from '@heroicons/react/solid';
import LoadingSpinner from './loadingSpinner';
export const ProductInfoModal = ({ closeModal, deviceInfo }) => {
    const [specifications, setSpecification] = useState([]);
    const [notification, setNotification] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const spec = deviceInfo?.deviceModel.specifications.split("--");
        console.log(spec);
        setSpecification(spec);
    }, [deviceInfo]);

    const handleBuyClick = async (id) => {
        setLoading(true);
        let success = false;

        try {
            await dispatch(addItemToCart(id));
            success = true; 
        } catch (error) {
            console.error("Failed to add item to cart: ", error);
        }

        setTimeout(() => {
            if (success) {
                setNotification('Item has been added to cart!');
            }
            setLoading(false); 
        }, 1000); 
    };
    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-8 w-2/3 max-h-fit overflow-hidden flex flex-col">
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 w-fit ml-auto">Close</button>
                <div className='flex flex-col md:flex-row min-h-full'>
                    <div className='w-full md:w-1/2 flex flex-col items-center'>
                        <h3 className="text-xl font-bold mb-4">{deviceInfo?.deviceModel.products[0].name}</h3>
                        <img 
                            src={deviceInfo?.deviceModel.products[0].imagePath} 
                            alt='Product Image' 
                            className='max-w-full max-h-72 object-contain mb-4'
                        />
                        <h4 className='text-xl mt-4'>${deviceInfo?.deviceModel.products[0].price}</h4>
                        <button className='mt-4 ${} bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' 
                            onClick={() => handleBuyClick(deviceInfo?.deviceModel.products[0].id)}
                            disabled={loading} >
                            {loading ? (
                                <LoadingSpinner/>
                            ):(
                                <>
                                    {notification ? (
                                        <CheckCircleIcon  className="h-5 w-5" aria-hidden="true" />
                                    ): (
                                        <p>
                                            Buy
                                        </p>
                                    )}
                                </>
                            )}
                        </button>
                    </div>
                    <div className='w-full md:w-1/2 overflow-auto'>
                        <h5 className='font-bold text-xl mb-4'>Specification</h5>
                        <div className='max-h-[60vh] overflow-auto'>
                            {specifications.map((specification, index) => (
                                <div key={index}>
                                    <h6 className='text-md font-semibold'>{specification}</h6>
                                    <hr className='mt-2 mb-2'></hr>
                                </div>
                            ))}   
                        </div>
                    </div>
                </div>

                {notification && (
                    <Notification message={notification}/>
                )}
            </div>
        </div>,
        document.body
    );
};
