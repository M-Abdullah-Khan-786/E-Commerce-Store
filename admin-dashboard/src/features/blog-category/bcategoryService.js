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

  export const createCblog = async (pBlogData) => {
    const response = await axios.post(`${base_url}/blog-category/create`, pBlogData, config);
    return response.data;
  };