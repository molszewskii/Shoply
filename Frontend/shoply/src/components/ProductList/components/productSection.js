import React from 'react';
import { ProductItemCard } from '../../productItemCard';

const ProductSection = ({ title, products }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold ml-3 mb-6">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {products.map((product) => (
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

export default ProductSection;
