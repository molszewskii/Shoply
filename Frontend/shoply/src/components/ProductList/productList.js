import React, { forwardRef, useEffect, useMemo } from 'react';
import LoadingSpinner from "./../loadingSpinner";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import LatestAppleProductsBanner from '../../assets/LatestAppleProductsBanner.png';
import SpecialOffersBanner from '../../assets/SpecialOffersBanner.png';
import Banner from './components/banner';
import ProductSection from './components/productSection';
import OfferSection from './components/offerSection';

const ProductList = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const shuffledProducts = useMemo(() => shuffleArray([...products]), [products]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p className="text-red-500 text-center">Error: {error}</p>;
    }

    return (
        <section ref={ref} id="products" className="mt-10 p-4 min-h-[800px]">

            <Banner
                title="Explore the Latest Apple Products"
                subtitle="Find the perfect device for you with our newest arrivals!"
                buttonText="Shop Now"
                backgroundImage={LatestAppleProductsBanner}
            />

            <ProductSection title="New Arrivals" products={shuffledProducts.slice(0, 4)} />

            <OfferSection 
                title="Special Offers Just for You!" 
                description="Don’t miss out on our limited-time deals!" 
                buttonText="Discover Deals" 
            />

            <ProductSection title="Best Sellers" products={shuffledProducts.slice(4, 8)} />

            <Banner 
                title="Huge Discounts on Selected Products!"
                subtitle="Shop now and save big on your favorite Apple devices."
                buttonText="Shop Deals"
                backgroundImage={SpecialOffersBanner}
            />

            <ProductSection title="Our Recommendations" products={shuffledProducts.slice(8, 12)} />

            <OfferSection 
                title="Trending Products" 
                description="Check out what’s popular among Apple fans right now." 
                buttonText="Explore Now" 
            />

            <ProductSection title="Special Promotions" products={shuffledProducts.slice(12, 16)} />
        </section>
    );
});

export default ProductList;
