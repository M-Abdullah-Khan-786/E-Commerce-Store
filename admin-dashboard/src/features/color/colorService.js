import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig"

// const getToken = localStorage.getItem("user")
//   ? JSON.parse(localStorage.getItem("user"))
//   : null;

// const config = getToken
//   ? {
//       headers: {
//         Authorization: `Bearer ${getToken.token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   : {};

export const getColor = async () => {
  const response = await axios.get(`${base_url}/color`);
  return response.data;
};

export const deleteColorById = async (id) => {
  const response = await axios.delete(`${base_url}/color/delete/${id}`, config);
  return response.data;
};

export const createColor = async (colorData) => {
  const response = await axios.post(`${base_url}/color/create`, colorData, config);
  return response.data;
};

export const updateColor = async (id, colorData) => {
  const response = await axios.put(`${base_url}/color/update/${id}`, colorData, config);
  return response.data;
};

export const getSingleColor = async (id) => {
  const response = await axios.get(`${base_url}/color/${id}`);
  return response.data;
};