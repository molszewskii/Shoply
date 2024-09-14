import { useState } from 'react';
import { useProducts } from "../contexts/productContext";
import LoadingSpinner from "./loadingSpinner";
import { ProductItemCard } from "./productItemCard";

const ProductList = () => {
    const { products, loading, error } = useProducts();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p className="text-red-500 text-center">Error: {error}</p>;
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setFilteredProducts(
            products.filter(product =>
                product.name.toLowerCase().includes(event.target.value.toLowerCase())
            )
        );
    };

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">No products found.</p>
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
        </div>
    );
};

export default ProductList;
