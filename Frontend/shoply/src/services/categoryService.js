import axios from "axios";

class CategoryService{
    constructor(){
        this.apibaseUrl = "https://localhost:7286/api/Category"
    }

    fetchCategories =async() =>{
        try{
            const response = await axios.get(`${this.apibaseUrl}/getCategories`);
            return response.data;
        }catch(error){
            console.error("Failed fetching categories")
            throw error;
        }  
    }
    
}

export default new CategoryService;