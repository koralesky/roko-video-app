import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { login } from "../features/auth/authSlice";
import { useAppDispatch } from "../store";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    if (formData.username.length === 0 || formData.password.length === 0) {
      toast.error("Please fill in all credentials!");
    } else {
      dispatch(
        login({
          username: formData.username,
          password: formData.password,
          device: {
            name: uuidv4(),
            platformCode: "WEB",
          },
        })
      )
        .unwrap()
        .catch(() => {
          toast.error("Wrong credentials!");
        });
    }
  };

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="bg-blue shadow-md my-auto mx-auto w-[100%] md:w-[600px] rounded-xl px-6 md:px-10 py-20 gap-3 flex flex-col">
      <h2 className="text-4xl font-semibold w-full md:w-2/3 mx-auto mb-3">
        Sign in
      </h2>
      <div className="w-full md:w-2/3 mx-auto">
        <form
          className="flex items-center mx-auto flex-col gap-4"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            name="username"
            className="form-control w-full rounded-md p-3 bg-blueLight focus-visible:outline-none"
            id="username"
            value={formData.username}
            placeholder="Enter your email"
            onChange={onChange}
          />
          <input
            type="password"
            name="password"
            className="form-control w-full rounded-md p-3 bg-blueLight focus-visible:outline-none"
            id="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={onChange}
          />

          <button
            type="submit"
            className="text-[white] bg-purple w-full p-3 mt-4 rounded-md text-xl font-semibold"
          >
            Sign in
          </button>
        </form>
        <div className="mt-5">
          <Link to="/">Continue as Anonymous User</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
