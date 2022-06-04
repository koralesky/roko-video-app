import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { anonUser, logout, reset } from "../features/auth/authSlice";
import { RootState } from "../store";

const useAuth = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
};

export default useAuth;
