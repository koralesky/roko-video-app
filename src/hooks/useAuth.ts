import { useEffect } from "react";
import { useSelector } from "react-redux";
import { anonUser, logout, reset } from "../features/auth/authSlice";
import { RootState, useAppDispatch } from "../store";
import { v4 as uuidv4 } from "uuid";
import isInThePast from "../utils/isInThePast";
import { toast } from "react-toastify";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAnon } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // If there is no user, or user = Anonymous, then sign in as Anonymous to get new expiration token.
    if (!user || isAnon) {
      dispatch(anonUser());
    } else {
      // If user != Anonymous and token expired then logout.
      // Normally I would use refresh token, to extend session, however in the tasks was mentioned to use only listed API mehtods.
      if (isInThePast(new Date(user.AuthorizationToken.TokenExpires))) {
        dispatch(logout());
        toast.warn("Session Expired.");
      }
    }
  }, []);

  return user;
};

export default useAuth;
