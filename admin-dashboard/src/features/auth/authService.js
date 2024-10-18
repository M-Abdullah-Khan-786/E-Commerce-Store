import axios from "axios";
import { base_url } from "../../utils/base_url";

const getToken = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const config = getToken
  ? {
      headers: {
        Authorization: `Bearer ${getToken.token}`,
        "Content-Type": "application/json",
      },
    }
  : {};

const login = async (userData) => {
  const response = await axios.post(`${base_url}/user/login-admin`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const getAllOrders = async () => {
  const response = await axios.get(`${base_url}/user/all-orders`, config);
  return response.data;
};

const auth = {
  login,
  getAllOrders,
};

export default auth;
