import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <div className="app-container px-10 bg-blueDark min-h-[100vh] text-[white] flex flex-col">
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
