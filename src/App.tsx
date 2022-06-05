import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "./store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/global.scss";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import PrivateRoute from "./routes/PrivateRoute";
import useAuth from "./hooks/useAuth";
import { useSelector } from "react-redux";
import { anonUser } from "./features/auth/authSlice";

function App() {
  useAuth();
  // const user = useAuth();

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    <>
      <div className="app-container relative px-5 md:px-10 py-20 bg-blueDark min-h-[100vh] text-[white] flex flex-col">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
