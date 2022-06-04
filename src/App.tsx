import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { RootState, useAppDispatch } from "./store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const dispatch = useAppDispatch();
  const { user, isAnon } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(
        anonUser({
          name: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          platformCode: "WEB",
        })
      );
    }
  }, [user, isAnon]);
  return (
    <>
      <div className="app-container relative px-10 py-20 bg-blueDark min-h-[100vh] text-[white] flex flex-col">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
