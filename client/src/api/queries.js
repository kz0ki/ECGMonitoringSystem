import $api from "./axiosInst";
import { clearToken, fetchToken } from "hocs/hocs";
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

export const getVerifyCode = async (email, first_name, last_name) => {
  return await axios.post(
    API_URL + "/api/get-verify-code",
    {
      email: email,
      first_name: first_name,
      last_name: last_name,
    },
    { headers: getHeaders() },
  );
};
export const checkVerifyCode = async (email, code) => {
  return await axios.post(
    API_URL + "/api/check-verify-code",
    {
      email: email,
      code: code,
    },
    { headers: getHeaders() },
  );
};

export const register = async (values) => {
  return await axios.post(API_URL + "/api/register", values, {
    headers: getHeaders(),
  });
};
export const getUserECG = async (user_id) => {
  return await axios.get(API_URL + "/api/user-ecg-diagrams", {
    params: {
      user_id: user_id,
    },
  });
};

export const getAddInform = async () => {
  return await axios.get(API_URL + "/api/additional-data", {
    headers: getHeaders(),
  });
};

export const updateUser = async (data) => {
  return await axios.post(API_URL + "/api/update-account", data, {
    headers: getHeaders(),
  });
};

export const changePassword = async () => {
  return await axios.post(API_URL + "/api/change-password", {
    headers: getHeaders(),
  });
};
