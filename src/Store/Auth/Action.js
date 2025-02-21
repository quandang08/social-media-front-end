import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import { 
  GET_USER_PROFILE_FAILURE, 
  GET_USER_PROFILE_SUCCESS, 
  LOGIN_USER_FAILURE, 
  LOGIN_USER_SUCCESS, 
  REGISTER_USER_FAILURE, 
  REGISTER_USER_SUCCESS 
} from "./ActionType";

// Hàm lưu JWT vào localStorage
const setJWT = (jwt) => {
  if (jwt) {
    localStorage.setItem("jwt", jwt);
  }
};

// Hàm lấy JWT từ localStorage
const getJWT = () => localStorage.getItem("jwt");

export const loginUser = (loginData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);

    setJWT(data?.jwt);

    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);

    dispatch({
      type: LOGIN_USER_FAILURE,
      payload: error.response?.data?.message || "Đăng nhập thất bại",
    });
  }
};

export const registerUser = (registerData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/register`, registerData);

    setJWT(data?.jwt);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);

    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: error.response?.data?.message || "Đăng ký thất bại",
    });
  }
};

export const getUserProfile = (jwt = getJWT()) => async (dispatch) => {
  try {
    if (!jwt) {
      throw new Error("Không tìm thấy token");
    }

    const { data } = await axios.get(`${API_BASE_URL}/api/user/profile`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.error("Get profile error:", error.response?.data || error.message);

    dispatch({
      type: GET_USER_PROFILE_FAILURE,
      payload: error.response?.data?.message || "Không thể lấy thông tin người dùng",
    });
  }
};
