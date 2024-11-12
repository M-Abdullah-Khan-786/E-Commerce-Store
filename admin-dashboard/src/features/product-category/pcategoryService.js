import axios from "axios"
import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosConfig"

export const getCproducts = async()=>{
    const response = await axios.get(`${base_url}/product-category`)
    return response.data
}

export const createCproduct = async (brandData) => {
    const response = await axios.post(`${base_url}/product-category/create`, brandData, config);
    return response.data;
  };