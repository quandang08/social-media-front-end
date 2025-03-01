import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import {
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  LOGOUT 
} from "./ActionType";

// Hàm lưu JWT vào localStorage
const setJWT = (jwt) => {
  if (jwt) {
    localStorage.setItem("jwt", jwt);
  }
};

// Hàm lấy JWT từ localStorage
const getJWT = () => localStorage.getItem("jwt") || null;

// Hàm xử lý lỗi chuẩn hơn
const getErrorMessage = (error) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Lỗi từ server";
  }
  return "Lỗi không xác định";
};

// 🟢 Đăng nhập
export const loginUser = (loginData) => async (dispatch) => {
  try {
    console.log("Login Data Sent:", loginData);

    // Kiểm tra dữ liệu đầu vào
    if (!loginData?.email || !loginData?.password) {
      throw new Error("Email và mật khẩu không được để trống");
    }

    const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData);
    console.log("Login API Response:", data);

    // Kiểm tra JWT trong phản hồi
    if (!data?.jwt) {
      throw new Error("Đăng nhập thất bại: Không nhận được token");
    }

    // Lưu JWT và dispatch thành công
    setJWT(data.jwt);
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: { jwt: data.jwt, user: data.user || null },
    });

  } catch (error) {
    console.error("Login error:", error.response?.data || error);

    dispatch({
      type: LOGIN_USER_FAILURE,
      payload: getErrorMessage(error),
    });
  }
};


// 🟢 Đăng ký
export const registerUser = (registerData) => async (dispatch) => {
  try {
    // Kiểm tra dữ liệu đầu vào
    if (!registerData?.email || !registerData?.password || !registerData?.fullName) {
      throw new Error("Vui lòng điền đầy đủ thông tin");
    }

    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData);
    console.log("Register API Response:", data);

    // Kiểm tra JWT trong phản hồi
    if (!data?.jwt) {
      throw new Error("Đăng ký thất bại: Không nhận được token");
    }

    // Lưu JWT và dispatch thành công
    setJWT(data.jwt);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });

  } catch (error) {
    console.error("Register error:", error);

    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: getErrorMessage(error),
    });
  }
};

// 🟢 Lấy thông tin người dùng
export const getUserProfile = () => async (dispatch) => {
  const jwt = getJWT();
  if (!jwt) {
    return dispatch({
      type: GET_USER_PROFILE_FAILURE,
      payload: "Không tìm thấy token",
    });
  }

  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.error("Get profile error:", error);

    dispatch({
      type: GET_USER_PROFILE_FAILURE,
      payload: getErrorMessage(error),
    });
  }
};

export const logout = () => async (dispatch) => {
    localStorage.removeItem("jwt");
    dispatch({ type: LOGOUT }); 
};
