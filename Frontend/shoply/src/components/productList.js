import { useProducts } from "../contexts/productContext"
import LoadingSpinner from "./loadingSpinner";
import { ProductItemCard } from "./productItemCard";

const ProductList = () =>{
    const {products, loading, error} = useProducts();
    if(loading){
        return <LoadingSpinner/>
    }
    if (error) {
        return <p className="text-red-500 text-center">Error: {error}</p>;
    }
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {products.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">No products available.</p>
                ) : (
                    products.map((product) => (
                        <ProductItemCard key={product.id} id={product.id} productName={product.name} price={product.price} productImage={product.imagePath}/>
                    ))
                )}
            </div>
        );
}

export default ProductList;