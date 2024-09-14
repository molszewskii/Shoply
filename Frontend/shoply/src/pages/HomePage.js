import React from 'react';
import HeroSection from '../components/heroSection';
import ProductList from '../components/productList';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <div className="mt-10">
        <ProductList />
      </div>
    </div>
  );
};

export default HomePage;
