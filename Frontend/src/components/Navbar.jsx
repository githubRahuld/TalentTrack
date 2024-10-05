import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { logoutUser } from "../store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.user);
  const userType = useSelector((state) => state.auth.userType);
  const [fullname, setFullName] = useState("");
  console.log(isLoggedIn);
  console.log(userData);
  console.log(userType);

  useEffect(() => {
    if (userData) {
      setFullName(userData?.user?.fullName);
    }

    if (!isLoggedIn) {
      console.log(isLoggedIn);

      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      dispatch(logoutUser());
      navigate("/users/login");
    }
  }, [isLoggedIn, navigate, userData]);

  const handleLogout = (e) => {
    e.preventDefault();

    axios
      .post(
        `${baseUrl}/api/v1/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      )
      .then((res) => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        dispatch(logoutUser());
        navigate("/users/login");
      })
      .catch((err) => {
        if (err.response.status === 411) {
          dispatch(logoutUser());
          navigate("/users/login");
        }
        console.log(err);
      });
  };
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to={"/users/home"}>
          <div className="text-white font-bold text-2xl">Company Logo</div>
        </Link>
        {isLoggedIn && (
          <ul className="flex space-x-6">
            {userType === "admin" && (
              <li>
                <Link
                  to="/admin/admin-dashboard"
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/users/create-employee"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Create Employee
              </Link>
            </li>
            <li className="text-slate-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              {fullname}
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
