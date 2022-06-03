import axios from "axios";

const API_URL = "https://thebetter.bsgroup.eu/Authorization";

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
  login,
  logout,
};

export default authService;
