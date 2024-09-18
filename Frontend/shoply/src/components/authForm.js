import React, { useState } from 'react'
import { FormInput } from './formInput';
import { useSelector } from 'react-redux';
import LoadingSpinner from './loadingSpinner';

export const AuthForm = ({mode, onSubmit}) => {
    const [formValues,setFormValues] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    });
    const [error,setError] = useState("")
    const {loading} = useSelector(state=>state.user)
    const handleInputChange=(e)=>{
        const {name,value} = e.target;
        setFormValues(prevValues =>({
            ...prevValues,
            [name]: value
        }));
    }

    const validatePassword = (password) => {
        console.log(password)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-])[A-Za-z\d@$!%*?&\-]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formValues)
        if(mode === 'register' && formValues.password !== formValues.confirmPassword){
            setError("Passwords do not match");
            return;
        }
        if(!validatePassword(formValues.password)){
            setError("Password does not meet the complexity requirements");
            return;
        }
        setError("");
        const {email, name, password} = formValues
        const userData = {email, password};
        if(mode === 'register'){
            userData.name = name;
        }
        console.log(userData)
        onSubmit(userData);
    }

    const fields = [
        ...(mode === 'register' ? [{label: "Name", name:"name",type:"text"}]:[]),
        {label:"Email", name:"email", type:"email"},
        {label:"Password", name:"password", type:"password"},
        ...(mode === 'register' ? [{label:"Confirm Password", name:"confirmPassword",type:"password"}]:[]),
    ]

    return (
        <form onSubmit={handleSubmit} className="w-1/2 h-full flex flex-col justify-evenly space-y-6 p-6">
            <h2 className="text-2xl font-bold text-center">{mode === 'login' ? 'Log in' : 'Register'}</h2>
            {fields.map((field,index) => (
                <FormInput
                    key={index}
                    label={field.label}
                    type={field.type}
                    name = {field.name}
                    value={formValues[field.name]}
                    onChange={handleInputChange}
                    required={mode==='register' || field.name === 'email' || field.name === 'password'}
                    />

            ))}
            {error && <div className="text-red-500">{error}</div>}
                <div className="text-center flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center min-h-[2.5rem] min-w-[8rem]"
                    >
                        {loading ? (
                            <LoadingSpinner size="w-5 h-5" />
                        ):(
                            <p>{mode === 'login' ? 'Sign in' : 'Sign up'}</p>
                        )}
                    </button>
            </div>
             </form>
    );
    
}
