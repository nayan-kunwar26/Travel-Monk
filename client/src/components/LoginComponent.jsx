import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const LoginComponent = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const login = useLogin();
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await login(inputs);
      if (data.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-700"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                required
                autoComplete="email"
                className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:border-gray-400"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-700"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-[#007e8f] hover:text-[#009CB0]"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                type="password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                required
                autoComplete="current-password"
                className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:border-gray-400"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-[#007e8f] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#009CB0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in
            </button>
            <p>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-[#007e8f] hover:text-[#009CB0]"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
