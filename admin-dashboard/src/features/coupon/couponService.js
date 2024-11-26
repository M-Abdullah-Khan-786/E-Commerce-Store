import axios from "axios"
import { base_url } from "../../utils/base_url"
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

export const getCoupon = async()=>{
    const response = await axios.get(`${base_url}/coupon`)
    return response.data
}

export const deleteCouponById = async (id) => {
    const response = await axios.delete(`${base_url}/coupon/delete/${id}`, config);
    return response.data;
};

export const createCoupon = async (couponData) => {
  const response = await axios.post(`${base_url}/coupon/create`, couponData, config);
  return response.data;
};

export const updateCoupon = async (id, couponData) => {
  const response = await axios.put(`${base_url}/coupon/update/${id}`, couponData, config);
  return response.data;
};

export const getSingleCoupon = async (id) => {
  const response = await axios.get(`${base_url}/coupon/${id}`);
  return response.data;
};