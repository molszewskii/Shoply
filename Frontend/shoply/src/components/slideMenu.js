import React from 'react'
import { useNavigate } from 'react-router-dom';
export const SlideMenu = ({ deviceModels, isVisible }) => {
    const navigate = useNavigate();
    const handleDeviceClick=(products,modelName)=>{
        console.log(products);
        navigate(`/products/${modelName.toLowerCase()}`, {state: {products}})
    }
    return (
        <div className={`bg-black w-full fixed top-20 left-0 transition-transform duration-300 ease-in-out z-10 ${isVisible ? 'translate-y-0 animate-slide-down' : '-translate-y-full opacity-0'}`}>
            {deviceModels.map(({ id, modelName, products }) => (
                <div key={id} className='text-white p-2 hover:bg-gray-700'>
                    <p onClick={()=>handleDeviceClick(products,modelName)}>{modelName}</p>
                </div>
            ))}
        </div>
    );
};

