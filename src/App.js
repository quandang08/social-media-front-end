import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import Authentication from "./Components/Authentication/Authentication";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./Store/Auth/Action";

function App() {
  const dispatch = useDispatch();
  const { user, jwt, loading } = useSelector((store) => store.auth); 

  useEffect(() => {
    if (jwt && !user) { 
      dispatch(getUserProfile(jwt));
      
    }
  }, [jwt, user, dispatch]);

  if (loading) return <div>Loading...</div>; 

  return (
    <div>
      <Routes>
        <Route path="/*" element={user ? <HomePage /> : <Authentication />} />
      </Routes>
    </div>
  );
}

export default App;
