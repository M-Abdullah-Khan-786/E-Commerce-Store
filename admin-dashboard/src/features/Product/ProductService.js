import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
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
