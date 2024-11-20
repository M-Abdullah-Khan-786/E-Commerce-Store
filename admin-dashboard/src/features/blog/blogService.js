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

export const getBlogs = async () => {
  try {
    const response = await axios.get(`${base_url}/blog`);
    return response.data;
  } catch (error) {
    throw new Error(
      `Error fetching products: ${
        error.response ? error.response.data : error.message
      }`
    );
  }
};

export const createBlogs = async (data) => {
  try {
    const response = await axios.post(`${base_url}/blog/create`, data, config);
    return response.data;
  } catch (error) {
    throw new Error(
      `Error creating blog: ${
        error.response ? error.response.data : error.message
      }`
    );
  }
};

export const deleteBlogs = async (id) => {
  try {
    const response = await axios.delete(
      `${base_url}/blog/delete/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Error deleting blog: ${
        error.response ? error.response.data : error.message
      }`
    );
  }
};

export const updateBlog = async (id, data) => {
  try {
    const response = await axios.put(`${base_url}/blog/update/${id}`, data, config);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating blog: ${error.response ? error.response.data : error.message}`);
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${base_url}/blog/${id}`, config);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching blog by ID: ${error.response ? error.response.data : error.message}`);
  }
};