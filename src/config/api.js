import axios from "axios";

export const API_BASE_URL = "http://localhost:5454";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Thêm token vào header để xác thực
    "Content-Type": "application/json",
  },
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
