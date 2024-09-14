import React, { useEffect, useState } from 'react';
import Banner from '../assets/banner.png'
const HeroSection = ({ productsRef }) => {
    const handleClick = () => {
      if (productsRef.current) {
        productsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
    return (
        <section 
        className="relative w-full h-[75vh] bg-cover bg-center flex items-center justify-center text-center overflow-hidden" 
        style={{ backgroundImage: `url(${Banner})`}}
        >
        <div 
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-transform duration-300" 
            
        />
        <div className="relative z-10 text-white flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold mb-4 animate-fade-in-up">
            Discover the Best Products
            </h1>
            <p className="text-lg mb-6 transition-opacity duration-1000 delay-300 animate-fade-in">
            The best deals and premium quality for you.
            </p>
            <button 
            className="bg-yellow-500 text-black px-8 py-3 rounded-lg text-lg font-semibold 
            transition duration-500 transform hover:scale-105 hover:bg-yellow-600"
            onClick={handleClick}
            >
            Shop Now
            </button>
        </div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full opacity-70 blur-3xl animate-float delay-1000"></div>
        <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-l from-pink-500 to-purple-500 rounded-full opacity-70 blur-3xl animate-float delay-500"></div>
        </section>
    );
};

export default HeroSection;
