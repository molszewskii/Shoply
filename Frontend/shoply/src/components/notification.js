import React from "react";
export const Notification = ({ message }) => {
    return (
        <div className={`fixed bottom-4 left-4 bg-gray-500 text-white p-3 rounded-xl transition-opacity duration-300 ${message ? 'opacity-100' : 'opacity-0'}`}>
            {message}
        </div>
    );
};