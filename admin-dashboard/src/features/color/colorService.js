import axios from "axios";
import { base_url } from "../../utils/base_url";

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

export const getColor = async () => {
  const response = await axios.get(`${base_url}/color`);
  return response.data;
};

export const deleteColorById = async (id) => {
  const response = await axios.delete(`${base_url}/color/delete/${id}`, config);
  return response.data;
};
