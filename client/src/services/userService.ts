import axios from "axios";
import { User, loginUser } from "../interfaces/User";

const api = `${process.env.REACT_APP_API}/user`;

export const register = async (user: User) => {
  try {
    const response = await axios.post(`${api}/register`, user);
    localStorage.setItem("token", response.data);
    return response.data;
  } catch (error) {
    alert("Registration failed:");
    throw error;
  }
};

export const login = async (user: loginUser) => {
  try {
    const response = await axios.post(`${api}/login`, user);
    localStorage.setItem("token", response.data);
    return response.data;
  } catch (error) {
    alert("Registration failed:");
    throw error;
  }
};

// export const logout = () => {
//   localStorage.removeItem("token");
//   window.location.reload();
// };
