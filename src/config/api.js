import axios from "axios";

export const API_BASE_URL = "http://localhost:5454";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🛠 Thêm interceptor để cập nhật token mới nhất trước mỗi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

/*
📌 File cấu hình Axios để gọi API.

🔹 `API_BASE_URL`: Định nghĩa URL gốc của API.  
🔹 `api`: Instance Axios với:  
   - `baseURL`: Tự động thêm tiền tố API.  
   - `headers`: 
     - `Authorization`: Gửi token từ `localStorage` để xác thực.  
     - `Content-Type`: Định dạng JSON.  

✅ Giúp tái sử dụng & đảm bảo mọi request có xác thực (nếu có token).
*/
