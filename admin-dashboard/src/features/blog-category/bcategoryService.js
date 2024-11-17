import axios from "axios"
import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosConfig"

export const getCblog = async()=>{
    const response = await axios.get(`${base_url}/blog-category`)
    return response.data
}

export const deleteCblogbyId = async (id) => {
    const response = await axios.delete(`${base_url}/blog-category/delete/${id}`, config);
    return response.data;
  };

  export const createCblog = async (bCategoryData) => {
    const response = await axios.post(`${base_url}/blog-category/create`, bCategoryData, config);
    return response.data;
  };

  export const updateCblog = async (id, bCategoryData) => {
    const response = await axios.put(`${base_url}/blog-category/update/${id}`, bCategoryData, config);
    return response.data;
  };
  
  export const getSingleCblog = async (id) => {
    const response = await axios.get(`${base_url}/blog-category/${id}`);
    return response.data;
  };