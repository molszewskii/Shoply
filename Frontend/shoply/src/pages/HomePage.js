import React from 'react';
import HeroSection from '../components/heroSection';
import ProductList from '../components/productList';

const PromotionSection = () => {
    return (
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Summer Sale</h2>
          <p className="text-lg mb-6">Get up to 50% off on selected items. Limited time offer!</p>
          <a href="/sale" className="bg-red-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-red-400">Shop Sale</a>
        </div>
      </div>
    );
  };
  
  const HomePage = () => {
    return (
      <div>
        <HeroSection />
        <PromotionSection />
        <div className="mt-10">
          <ProductList />
        </div>
      </div>
    );
  };
    

export default HomePage;
