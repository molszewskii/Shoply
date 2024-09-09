import React from 'react'
import {ShoppingCartIcon} from '@heroicons/react/outline'
export const Navbar = () => {
  return (
    <div className='w-full h-20 bg-black text-white flex justify-end items-center p-10'>
        <p className='mr-auto text-2xl font-bold '>Shoply</p>
        <p className='mr-6'>Michał</p>
        <ShoppingCartIcon className="size-7 text-white-500" onClick={()=>alert("Kliknieto")} />
    </div>
    
  )
}
