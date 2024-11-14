import axios from "axios"
import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosConfig"

export const getCproducts = async()=>{
    const response = await axios.get(`${base_url}/product-category`)
    return response.data
}

export const deleteCproductsbyId = async (id) => {
    const response = await axios.delete(`${base_url}/product-category/delete/${id}`, config);
    return response.data;
  };

export const createCproduct = async (pCategoryData) => {
    const response = await axios.post(`${base_url}/product-category/create`, pCategoryData, config);
    return response.data;
  };

  export const updateCproduct = async (id, pCategoryData) => {
    const response = await axios.put(`${base_url}/product-category/update/${id}`, pCategoryData, config);
    return response.data;
  };
  
  export const getSingleCproduct = async (id) => {
    const response = await axios.get(`${base_url}/product-category/${id}`);
    return response.data;
  };