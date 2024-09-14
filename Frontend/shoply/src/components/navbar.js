import React from 'react'
import {ShoppingCartIcon} from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
export const Navbar = () => {
  const navigate = useNavigate();

  const handleCartClick =()=>{
    navigate("/cart")
  }
  const handleLogoClick = () =>{
    navigate("/")
  }
  return (
    <div className='w-full h-20 bg-black text-white flex justify-end items-center p-10'>
        <p className='mr-auto text-2xl font-bold ' onClick={handleLogoClick}>Shoply</p>
        <p className='mr-6'>Michał</p>
        <ShoppingCartIcon className="size-7 text-white-500" onClick={handleCartClick} />
    </div>
    
  )
}
