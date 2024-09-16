import React, { forwardRef, useImperativeHandle, useState, useEffect, useMemo } from 'react';
import LoadingSpinner from "./loadingSpinner";
import { ProductItemCard } from "./productItemCard";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';

const ProductList = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state=>state.products)
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(()=>{
      dispatch(fetchProducts());
    },[dispatch])

    const filteredProducts = useMemo(() => {
        return products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p className="text-red-500 text-center">Error: {error}</p>;
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <section ref={ref} id="products" className="mt-10 p-4 min-h-[800px]">
             <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
            />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {filteredProducts.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">No products available.</p>
            ) : (
              filteredProducts.map((product) => (
                <ProductItemCard
                  key={product.id}
                  id={product.id}
                  productName={product.name}
                  price={product.price}
                  productImage={product.imagePath}
                />
              ))
            )}
          </div>
        </section>
    );
});

export default ProductList;
