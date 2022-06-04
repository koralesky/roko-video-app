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
    if (!user) {
      dispatch(
        anonUser({
          name: uuidv4(),
          platformCode: "WEB",
        })
      );
    } else {
      if (isAnon) {
        if (isInThePast(new Date(user.AuthorizationToken.TokenExpires))) {
          dispatch(
            anonUser({
              name: uuidv4(),
              platformCode: "WEB",
            })
          );
        }
      } else {
        if (isInThePast(new Date(user.AuthorizationToken.TokenExpires))) {
          dispatch(logout());
          toast.warn("Session Expired.");
        }
      }
    }
  }, [user, isAnon]);
};

export default useAuth;
