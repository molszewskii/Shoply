import React from 'react'

export const CartPageNavbar = ({currentStep}) => {
    const steps = ["Product List", "Delivery & Payment", "My Details", "Summary"]
    return (
        <div className="w-full min-h-[10vh] mb-3 border flex items-center justify-center">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center mx-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === index + 1 ? "bg-yellow-400 text-white" : "bg-gray-300 text-gray-700"}`}>
                        {index + 1}
                    </div>
                    <p className={`ml-2 ${currentStep === index + 1 ? "font-bold text-yellow-400" : "text-gray-500"}`}>
                        {step}
                    </p>
                    {(index < steps.length-1) && (
                             <hr className='bg-black min-w-[15vh] ml-16'></hr>
                    )}
                    
                </div>
            ))}
           
        </div>
    )
}
