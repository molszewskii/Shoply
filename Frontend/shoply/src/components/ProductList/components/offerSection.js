import React from 'react';

const OfferSection = ({ title, description, buttonText }) => {
    return (
        <div className="relative bg-yellow-400 text-black py-16 px-4 text-center rounded-lg mb-10 mt-10">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-lg mb-6">{description}</p>
            <button className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800">
                {buttonText}
            </button>
        </div>
    );
};

export default OfferSection;
