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

const getProducts = async () => {
  const response = await axios.get(`${base_url}/product`);
  return response.data;
};

const createProduct = async (data) => {
  const response = await axios.post(`${base_url}/product/create`, data, config);
  return response.data;
};

const product = {
  getProducts,
  createProduct,
};

export default product;
