import toast from "react-hot-toast";
import axiosInstance from "./api";

class AuthApi {
  login = async (username, password) => {
    const response = await axiosInstance.post("/user/signIn", {
      username,
      password,
    });
    if (response.isSuccess) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
    }
    return response;
  };
  register = async (email, username, password) => {
    const response = await axiosInstance.post("/user/signUp", {
      email,
      username,
      password,
    });
    if (!response.isSuccess) {
      toast.error(response.message);
    }
    return response;
  };
}

export const authApi = new AuthApi();
