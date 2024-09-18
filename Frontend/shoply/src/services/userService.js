import axios from "axios"

class UserService{
    constructor(){
        this.apiBaseUrl = "https://localhost:7286/api/Auth"
    }

    loginUser = async(userData)=>{
        try{
            const response = await axios.post(`${this.apiBaseUrl}/login`,userData);
            return response.data;
        }catch(error){
            console.error('Login failed:', error.response ? error.response.data : error.message);
            throw error.response ? error.response.data : new Error("Login failed");
        }
        
    }

    registerUser = async(userData)=>{
        console.log(userData)
        try{
            const response = await axios.post(`${this.apiBaseUrl}/register`,userData);
            return response.data;
        }catch(error){
            throw error.response ? error.response.data : new Error("Registration failed");
        }
    }

}

export default new UserService();