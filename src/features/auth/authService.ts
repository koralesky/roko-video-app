import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AUTH_API_URL as API_URL } from "../../constants/api";

// Anonymous user
const anonUser = async (name: string, platformCode: string) => {
  const response = await axios.post(API_URL + "/SignIn", {
    name,
    platformCode,
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login
const login = async (username: string, password: string) => {
  const response = await axios.post(API_URL + "/SignIn", {
    username,
    password,
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  anonUser,
  login,
  logout,
};

export default authService;
