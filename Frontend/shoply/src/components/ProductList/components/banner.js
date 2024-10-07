import React from 'react';

const Banner = ({ title, subtitle, buttonText, backgroundImage, buttonAction }) => {
    return (
        <div className="relative bg-gray-800 text-white py-20 px-4 text-center rounded-lg mb-10">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-lg mb-6">{subtitle}</p>
            <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200" onClick={buttonAction}>
                {buttonText}
            </button>
            <img
                src={backgroundImage}
                alt="Banner Image"
                className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            />
        </div>
    );
};

export default Banner;
