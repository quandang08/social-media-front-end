import axios from "axios";
import { api, API_BASE_URL } from "../../config/api";
import {
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS,
  LOGOUT,
  FIND_USER_BY_ID_SUCCESS,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  FIND_USER_BY_NAME_SUCCESS,
  FIND_USER_BY_NAME_FAILURE,
  FIND_USER_BY_NAME_REQUEST,
  GET_UNFOLLOWED_USERS_REQUEST,
  GET_UNFOLLOWED_USERS_SUCCESS,
  GET_UNFOLLOWED_USERS_FAILURE,

  FETCH_NOTIFICATIONS_REQUEST,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  MARK_AS_READ_REQUEST,
  MARK_AS_READ_SUCCESS,
  MARK_AS_READ_FAILURE,
  DELETE_NOTIFICATION_REQUEST,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_FAILURE,
  MARK_ALL_AS_READ_REQUEST,
  MARK_ALL_AS_READ_SUCCESS,
  MARK_ALL_AS_READ_FAILURE,
  CREATE_NOTIFICATION_REQUEST,
  CREATE_NOTIFICATION_SUCCESS,
  CREATE_NOTIFICATION_FAILURE,
  ADD_NOTIFICATION,
  
} from "./ActionType";

// Hàm lưu JWT vào localStorage
const setJWT = (jwt) => {
  if (jwt) {
    localStorage.setItem("jwt", jwt);
  }
};

// Hàm lấy JWT từ localStorage
const getJWT = () => localStorage.getItem("jwt") || null;

// Hàm xử lý lỗi
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
    if (
      !registerData?.email ||
      !registerData?.password ||
      !registerData?.fullName
    ) {
      throw new Error("Vui lòng điền đầy đủ thông tin");
    }

    const { data } = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      registerData
    );
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

// 🟢 Tim User theo ID
export const findUserById = (userId) => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/users/${userId}`)
    console.log("find user id: ",data);
    dispatch({ type: FIND_USER_BY_ID_SUCCESS, payload: data });

  } catch (error) {
    console.error("Search Id failure:", error);

    dispatch({
      type: GET_USER_PROFILE_FAILURE,
      payload: getErrorMessage(error),
    });
  }
};

// 🟢 Tim User theo full name
export const findUserByName = (fullName) => async (dispatch) => {
  try {
    dispatch({ type: FIND_USER_BY_NAME_REQUEST });

    const { data } = await api.get(`/api/users/search?query=${fullName}`);
    console.log("find user name: ", data);

    dispatch({ type: FIND_USER_BY_NAME_SUCCESS, payload: data });
  } catch (error) {
    console.error("Search name failure:", error);

    dispatch({
      type: FIND_USER_BY_NAME_FAILURE,
      payload: getErrorMessage(error),
    });
  }
};

// 🟢 Thay đổi thông tin người dùng
export const updateUserProfile = (reqData) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/update`, reqData)
    console.log("updated user", data);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: data });

  } catch (error) {
    console.error("error: ", error);

    dispatch({
      type: UPDATE_USER_FAILURE,
      payload: getErrorMessage(error),
    });
  }
};

// 🟢 Theo dõi người dùng theo ID
export const followUserAction = (userId) => async (dispatch) => {
  try {
    const { data } = await api.put(`/api/users/${userId}/follow`)
    console.log("followed user", data);
    dispatch({ type: FOLLOW_USER_SUCCESS, payload: data });

  } catch (error) {
    console.error("error: ", error);

    dispatch({
      type: FOLLOW_USER_FAILURE,
      payload: getErrorMessage(error),
    });
  }
}; 

// 🟢 Lấy danh sách người dùng chưa follow
export const getUnfollowedUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_UNFOLLOWED_USERS_REQUEST });

    const { data } = await api.get("/api/users/not-followed");
    console.log("Unfollowed users:", data);

    dispatch({ type: GET_UNFOLLOWED_USERS_SUCCESS, payload: data });
  } catch (error) {
    console.error("Get unfollowed users error:", error);

    dispatch({
      type: GET_UNFOLLOWED_USERS_FAILURE,
      payload: getErrorMessage(error),
    });
  }
};

// 🟢 Tạo 1 notification
export const createNotification = (notificationData) => async (dispatch, getState) => {
  try {
    // Bắt đầu request
    dispatch({ type: CREATE_NOTIFICATION_REQUEST });

    const token = getState().auth.jwt;
    // Gọi API POST /api/notifications/create
    const { data } = await api.post(`${API_BASE_URL}/api/notifications/create`, notificationData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: CREATE_NOTIFICATION_SUCCESS, payload: data });

    // Nếu muốn cập nhật luôn danh sách notifications trong Redux, có thể dispatch thêm:
    dispatch({ type: ADD_NOTIFICATION, payload: data });

  } catch (error) {
    // Nếu lỗi
    dispatch({
      type: CREATE_NOTIFICATION_FAILURE,
      payload: getErrorMessage(error),
    });
  }
};

// Lấy danh sách notifications của user
export const fetchNotifications = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_NOTIFICATIONS_REQUEST });
    const token = getState().auth.jwt;
    const { data } = await axios.get(`${API_BASE_URL}/api/notifications/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: FETCH_NOTIFICATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NOTIFICATIONS_FAILURE,
      payload: getErrorMessage(error),
    });
  }
};

// Đánh dấu một notification là đã đọc
export const markNotificationAsRead = (notificationId) => async (dispatch, getState) => {
  try {
    dispatch({ type: MARK_AS_READ_REQUEST });
    const token = getState().auth.jwt;
    const { data } = await api.put(`${API_BASE_URL}/api/notifications/${notificationId}/read`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: MARK_AS_READ_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MARK_AS_READ_FAILURE,
      payload: getErrorMessage(error),
    });
  }
};

// Xóa một notification
export const deleteNotification = (notificationId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_NOTIFICATION_REQUEST });
    const token = getState().auth.jwt;
    await axios.delete(`${API_BASE_URL}/api/notifications/delete/${notificationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: DELETE_NOTIFICATION_SUCCESS, payload: notificationId });
  } catch (error) {
    dispatch({
      type: DELETE_NOTIFICATION_FAILURE,
      payload: getErrorMessage(error),
    });
  }
};

// Đánh dấu tất cả notifications là đã đọc
export const markAllNotificationsAsRead = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MARK_ALL_AS_READ_REQUEST });
    const token = getState().auth.jwt;
    await axios.put(`${API_BASE_URL}/api/notifications/read-all`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: MARK_ALL_AS_READ_SUCCESS });
  } catch (error) {
    dispatch({
      type: MARK_ALL_AS_READ_FAILURE,
      payload: getErrorMessage(error),
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT });
};
