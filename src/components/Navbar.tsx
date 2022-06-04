import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout, reset } from "../features/auth/authSlice";

function Navbar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    //   @ts-ignore
    dispatch(logout());
    dispatch(reset());
    toast.success("Logged out!");
  };
  return (
    <div className="w-[100vw] absolute left-0 top-0 px-10 py-4 flex justify-between items-center">
      <div className="nav-left">
        <ul className="flex gap-14 items-center">
          <li className="text-2xl font-extrabold text-orangeLight">ROKOvid</li>
          <li>Home</li>
        </ul>
      </div>
      <div className="nav-right">
        <button
          // @ts-ignore
          onClick={handleLogout}
          className="bg-yellowDark py-2 px-4 rounded-2xl text-blue font-bold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
