import React, { useEffect, useState } from 'react'
import {ShoppingCartIcon} from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import categoryService from '../services/categoryService';
import deviceModelService from '../services/deviceModelService';
import { SlideMenu } from './slideMenu';

export const Navbar = () => {
  const navigate = useNavigate();
  const {name, isLoggedIn} = useSelector(state=>state.user)
  const [categories, setCategories] = useState([])
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  useEffect(()=>{
    const fetchData =async()=>{
      try{
        const data = await categoryService.fetchCategories();
        setCategories(data);
      }catch(error){
        console.error("Failed fetching categories");
        throw error;
      }
    }
    fetchData();
  },[])

  const handleCategoryHover = async(categoryId)=>{
    try{
      const details = await deviceModelService.getDeviceModels(categoryId);
      console.log(details)
      setCategoryDetails(details);
      setIsMenuVisible(true);
    }catch(error){
      console.error("Failed fetching cetegory details");
      throw error;
    }
  }
  const handleMouseLeave = () => {
    setIsMenuVisible(false);
};
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
        <p className='text-2xl font-bold mr-auto' onClick={handleLogoClick}>Shoply</p>
        <div className='w-1/2 flex justify-evenly mr-auto'>
          {categories.map((category)=>(
            <button key={category.id} className='' onMouseEnter={()=>handleCategoryHover(category.id)}>{category.categoryName}</button>
          ))}
        </div>
        {isMenuVisible && (
          <div onMouseEnter={() => setIsMenuVisible(true)} onMouseLeave={handleMouseLeave}>
            <SlideMenu deviceModels={categoryDetails} isVisible={isMenuVisible} />
          </div>
        )}
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
