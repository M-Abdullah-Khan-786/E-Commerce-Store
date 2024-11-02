import axios from "axios"
import { base_url } from "../../utils/base_url"

const getToken = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const config = getToken
  ? {
      headers: {
        Authorization: `Bearer ${getToken.token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  : {};

export const getBrand = async()=>{
    const response = await axios.get(`${base_url}/brand`)
    return response.data
}

export const deleteBrandById = async (id) => {
    const response = await axios.delete(`${base_url}/brand/delete/${id}`, config);
    return response.data;
};