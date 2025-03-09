import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import Authentication from "./Components/Authentication/Authentication";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./Store/Auth/Action";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, jwt, loading } = useSelector((store) => store.auth);

  useEffect(() => {
    if (jwt && !user) {
      dispatch(getUserProfile(jwt));
    }
  }, [jwt, user, dispatch]);

  useEffect(() => {
    if (user && ["/", "/signin", "/signup"].includes(window.location.pathname)) {
      navigate("/home", { replace: true });
    }
  }, [user, navigate]);
  

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/*" element={user ? <HomePage /> : <Authentication />} />
      </Routes>
    </div>
  );
}

export default App;
