import { is } from "immer/dist/internal";
import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    if (formData.username.length === 0 || formData.password.length === 0) {
      toast.error("Please fill in all credentials!");
    } else {
      dispatch(
        // @ts-ignore
        login({
          username: formData.username,
          password: formData.password,
        })
      )
        .unwrap()
        .catch(() => {
          toast.error("Wrong credentials!");
        })
        .then(() => {
          toast.success("Logged in");
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
    <div className="bg-blue shadow-md my-auto mx-auto w-[100%] md:w-[600px] rounded-xl px-10 py-20 gap-3 flex flex-col">
      <h2 className="text-4xl font-semibold w-full md:w-2/3 mx-auto mb-3">
        Sign in
      </h2>
      <div className="">
        <form
          className="flex items-center w-full md:w-2/3 mx-auto flex-col gap-4"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            name="formUsername"
            className="form-control w-full rounded-md p-3 bg-blueLight focus-visible:outline-none"
            id="username"
            value={formData.username}
            placeholder="Enter your email"
            onChange={onChange}
          />
          <input
            type="password"
            name="formPassword"
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
      </div>
    </div>
  );
}

export default Login;
