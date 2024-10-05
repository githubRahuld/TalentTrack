import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post(`${baseUrl}/api/v1/users/register`, {
        fullName,
        username,
        password,
      })
      .then((res) => {
        setLoading(false);
        setErr("");
        console.log(res);

        navigate("/users/login");
      })
      .catch((error) => {
        setLoading(false);
        setErr(error.response.data.message);
        console.error("Register error", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {loading ? (
        <h1 className="text-2xl font-bold text-gray-700">Loading...</h1>
      ) : (
        <div className="bg-white shadow-md rounded-lg px-10 py-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Register
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              {err && (
                <h1 className="text-lg text-thin text-center text-red-500 mb-2">
                  {err}
                </h1>
              )}
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
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
              Register
            </button>
            <div className="text-center mt-4">
              <Link to="/users/login" className="text-blue-500 hover:underline">
                Old user? Login here
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
