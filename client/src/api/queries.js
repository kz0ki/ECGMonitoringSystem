import $api from "./axiosInst";
import { fetchToken } from "hocs/hocs";
import { API_URL } from "../constants";
import axios from "axios";

const getHeaders = () => ({
  Authorization: `JWT ${localStorage.getItem("token")}`,
});
// export const verifyToken = async () => {
//   return await axios.get(API_URL+, {
//     headers: getHeaders(),
//   });
// };

export const fetchPatients = async () => {
  return await axios.get(API_URL + "/api/my-patients", {
    headers: getHeaders(),
  });
};
export const login = async (values) => {
  return await axios.post(API_URL + "/api/login", {
    ...values,
  });
};
export const fetchMe = async () => {
  return await axios.post(API_URL + "/api/me", {}, { headers: getHeaders() });
};
