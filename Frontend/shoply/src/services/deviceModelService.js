import axios from "axios"

class DeviceModelService{
    constructor(){
        this.apiBaseUrl = "https://localhost:7286/api/DeviceModel"
    }

    getDeviceModels=async(categoryId)=>{
        try{
            const response = await axios.get(`${this.apiBaseUrl}/getDeviceModelsByCategoryId/${categoryId}`)
            console.log(response.data)
            return response.data
        }catch(error){
            console.error("Failed to fetch device models");
            throw error;
        }
    }

    getDeviceModelInfo = async(productId)=>{
        try{
            const response = await axios.get(`${this.apiBaseUrl}/getDeviceInfoById/${productId}`)
            console.log(response.data)
            return response.data;
        }catch(error){
            console.error("Failed to fetch device model info")
            throw error;
        }
    }
}
export default new DeviceModelService;