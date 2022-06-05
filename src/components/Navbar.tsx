import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { anonUser, logout, reset } from "../features/auth/authSlice";
import { RootState, useAppDispatch } from "../store";

function Navbar() {
  const dispatch = useAppDispatch();
  const { isAnon, user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        dispatch(anonUser()).unwrap();
      });
    dispatch(reset());
    toast.success("Logged out!");
  };

  return (
    <div className="w-[100vw] absolute left-0 top-0 px-10 py-4 flex justify-between items-center">
      <div className="nav-left">
        <ul className="flex gap-14 items-center">
          <li className="text-2xl font-extrabold text-green">
            <Link to="/">ROKOvid</Link>
          </li>
        </ul>
      </div>
      <div className="nav-right mr-4">
        {isAnon ? (
          <Link to="/login">
            <button className="button">Login</button>
          </Link>
        ) : (
          <>
            {!isAnon && user && (
              <span className="mr-4">Welcome {user.User.FullName}!</span>
            )}
            <button onClick={handleLogout} className="button">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
