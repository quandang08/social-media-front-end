import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import Authentication from "./Components/Authentication/Authentication";

function App() {
  // Sử dụng trạng thái để mô phỏng điều kiện (true/false)
  const isAuthenticated = true; // Thay đổi giá trị này để kiểm tra điều hướng

  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Authentication />}
        />
      </Routes>
    </div>
  );
}

export default App;
