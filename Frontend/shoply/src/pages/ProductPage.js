import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductItemCard } from '../components/productItemCard';
import productService from '../services/productService';

export const ProductPage = () => {
    const location = useLocation();
    const initialProducts = location.state?.products || [];
    const [products, setProducts] = useState(initialProducts); 
    const [changeTitle, setChangeTitle] =useState(false);
    
    useEffect(()=>{
        setProducts(initialProducts)
        setChangeTitle(false);
    },[initialProducts])

    const getDisplayName = (modelName) => {
        const words = modelName.split(' ');
        let displayName;

        if (words[0].toLowerCase() === 'apple') {
            displayName =words[0] +" "+ words[1] + "e";
        } else {
            displayName = words[0];
        }

        if (displayName.endsWith('s')) {
            displayName = displayName.slice(0, -1);
        }

        return displayName;
    };

    const displayName = products[0]?.modelName ? getDisplayName(products[0].modelName) : '';

    const handleViewAllClick = async (categoryId) => {
        try {
            const data = await productService.fetchProductsByCategoryId(categoryId);
            setProducts(data);
            setChangeTitle(true);
        } catch (error) {
            console.error("Failed to fetch products by categoryId", error);
        }
    };

    return (
        <div className='flex flex-col p-7'>
            <div className='w-full flex'>
                <h1 className='font-bold text-3xl mr-auto ml-4'>{ changeTitle ? displayName + "s" : products[0]?.modelName}</h1>
                <h2 onClick={() => handleViewAllClick(products[0]?.categoryId)}>View all {displayName}s {'>'} </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {products?.map((product) => (
                    <ProductItemCard
                        key={product.id}
                        id={product.id}
                        productName={product.name}
                        price={product.price}
                        productImage={product.imagePath}
                    />
                ))}
            </div>
        </div>
    );
};
