import React from 'react'
import {ShoppingCartIcon} from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
export const Navbar = () => {
  const navigate = useNavigate();
  const {name, isLoggedIn} = useSelector(state=>state.user)
  const handleCartClick =()=>{
    navigate("/cart")
  }
  const handleLogoClick = () =>{
    navigate("/")
  }
  const handleSignInClick = () =>{
    navigate("/login")
  }
  return (
    <div className='w-full h-20 bg-black text-white flex justify-end items-center p-10'>
        <p className='mr-auto text-2xl font-bold ' onClick={handleLogoClick}>Shoply</p>
        {isLoggedIn ? (
          <>
          <p className='mr-6'>{name}</p>
          <ShoppingCartIcon className="size-7 text-white-500" onClick={handleCartClick} />
          </>
        ):(
          <>
          <button className='mr-6' onClick={handleSignInClick}>Sign In</button>
          </>
        )}
        
    </div>
    
  )
}
