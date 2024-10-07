import axios from 'axios'
class ProductService {
    constructor(){
        this.apiBaseUrl = "https://localhost:7286/api/Products"
    }

    fetchProducts = async () => {
        try{
            const response = await axios.get(`${this.apiBaseUrl}/getProducts`);
            return response.data;
        }catch(error){
            console.error("There was a problem with products fetch");
            throw error;
        }
    }

    fetchProductsByCategoryId = async(categoryId)=>{
        try{
            const response = await axios.get(`${this.apiBaseUrl}/getProductsByCategoryId/${categoryId}`);
            return response.data;
        }catch(error){
            console.error("Failed to fetch products by category ID");
            throw error;
        }
    }
}

export default new ProductService();