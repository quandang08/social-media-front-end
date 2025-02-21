import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import Authentication from "./Components/Authentication/Authentication";

function App() {

  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={false ? <HomePage /> : <Authentication />}
        />
      </Routes>
    </div>
  );
}

export default App;