import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import { fetchMe } from "../api/queries";

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const fetchToken = () => {
  return localStorage.getItem("token");
};
export const clearToken = () => {
  localStorage.removeItem("token");
};

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const token = fetchToken();
      const fetchData = async () => {
        if (token) {
          try {
            const response = await fetchMe();
            if (response.data?.success) {
              setUser(response.data?.user);
            } else {
              clearToken();
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      };

      fetchData();
    }, []);

    return <WrappedComponent {...props} user={user} />;
  };
};

export default withAuth;
