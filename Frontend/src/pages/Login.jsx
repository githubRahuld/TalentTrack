import React, { useState } from "react";
import axios from "axios";
import { Link, useFormAction, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${baseUrl}/api/v1/users/login`, {
        username,
        password,
      })
      .then((res) => {
        console.log(res.data);

        const refreshToken = res.data.data.refreshToken;
        const accessToken = res.data.data.accessToken;
        const userData = res.data.data;

        Cookies.set("accessToken", accessToken);
        Cookies.set("refreshToken", refreshToken);

        dispatch(loginUser({ userData }));
        if (useFormAction) navigate("/users/home");
      })
      .catch((error) => {
        console.error("Login error", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg px-10 py-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
          >
            Login
          </button>
          <div className="text-center mt-4">
            <Link
              to="/users/register"
              className="text-blue-500 hover:underline"
            >
              New user? Sign-up here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
