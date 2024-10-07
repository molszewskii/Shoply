import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { fetchProducts } from '../redux/slices/productSlice';
import { ProductItemCard } from './productItemCard';

const ProductSlider = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="max-w-full p-4">
            <h1 className='text-2xl font-bold mt-3 mb-4 text-left ml-3'>Discover Our Latest Products</h1>
            <Swiper
                spaceBetween={30}
                slidesPerView={3}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}

                modules={[Navigation, Pagination]}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id} className="p-3">
                        <ProductItemCard 
                            id={product.id} 
                            productName={product.productName} 
                            price={product.price} 
                            productImage={product.imagePath} 
                        />
                    </SwiperSlide>
                ))}
                <div className="swiper-button-prev rounded-full text-white flex items-center justify-center w-10 h-10">
                </div>
                <div className="swiper-button-next rounded-full text-white flex items-center justify-center w-10 h-10">
                </div>
            </Swiper>
            
        </div>
    );
};

export default ProductSlider;
