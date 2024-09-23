import React, { useEffect } from 'react'
import { AuthForm } from '../components/authForm'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../redux/slices/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const AuthPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { error, name, email, token, isLoggedIn } = useSelector(state => state.user);
    const isRegister = location.pathname === '/register'
    
    const handleAuthSubmit = (userData) => {
        if(userData.name)
            dispatch(registerUser(userData));
        else
            dispatch(loginUser(userData));
        console.log(name, email, token, isLoggedIn);
    }

    useEffect(()=>{
        if(isLoggedIn){
            navigate("/");
        }
    },[isLoggedIn,navigate])
    return (
        <div className="flex justify-center items-center flex-grow h-full">
            <div className='border shadow-lg w-2/5 min-h-fit flex justify-center p-5'> 
                <AuthForm mode={isRegister ? 'register' : 'login'} onSubmit={handleAuthSubmit} />
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    )
}

