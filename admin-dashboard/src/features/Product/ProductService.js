import axios from "axios";
import { base_url } from "../../utils/base_url";

const getToken = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const config = {
  headers: {
    Authorization: `Bearer ${getToken.token}`,
    "Content-Type": "multipart/form-data",
  },
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${base_url}/product`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching products: ${error.response ? error.response.data : error.message}`);
  }
};

export const createProducts = async (data) => {
  try {
    const response = await axios.post(`${base_url}/product/create`, data, config);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating product: ${error.response ? error.response.data : error.message}`);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${base_url}/product/delete/${id}`, config);
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting product: ${error.response ? error.response.data : error.message}`);
  }
};

