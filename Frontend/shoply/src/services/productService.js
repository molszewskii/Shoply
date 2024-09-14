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
}

export default new ProductService();