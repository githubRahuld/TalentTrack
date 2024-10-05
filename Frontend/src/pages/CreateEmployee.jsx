import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CreateEmployee = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [designation, setDesignation] = useState("HR");
  const [gender, setGender] = useState("M");
  const [courses, setCourses] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobileNo", mobileNo);
    formData.append("designation", designation);
    formData.append("gender", gender);
    courses.forEach((course) => formData.append("courses", course));
    formData.append("avatar", avatar);

    try {
      const res = await axios.post(
        `${baseUrl}/api/v1/users/employees`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      setLoading(false);
      console.log(res.data);

      navigate("/users/home");
    } catch (error) {
      setLoading(false);
      console.error("Create employee error", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!loading ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Create Employee
          </h2>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="mobileNo"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              placeholder="Mobile No"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <select
              value={designation}
              name="designation"
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className="mb-4">
            <span className="text-gray-700 mr-4">Gender:</span>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="gender"
                value="M"
                checked={gender === "M"}
                onChange={() => setGender("M")}
                className="form-radio"
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="F"
                checked={gender === "F"}
                onChange={() => setGender("F")}
                className="form-radio"
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
          <div className="mb-4">
            <span className="text-gray-700">Courses:</span>
            <div className="flex flex-col space-y-2 mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="courses"
                  value="MCA"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCourses([...courses, e.target.value]);
                    } else {
                      setCourses(
                        courses.filter((course) => course !== e.target.value)
                      );
                    }
                  }}
                  className="form-checkbox"
                />
                <span className="ml-2">MCA</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="BCA"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCourses([...courses, e.target.value]);
                    } else {
                      setCourses(
                        courses.filter((course) => course !== e.target.value)
                      );
                    }
                  }}
                  className="form-checkbox"
                />
                <span className="ml-2">BCA</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  value="BSC"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCourses([...courses, e.target.value]);
                    } else {
                      setCourses(
                        courses.filter((course) => course !== e.target.value)
                      );
                    }
                  }}
                  className="form-checkbox"
                />
                <span className="ml-2">BSC</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <input
              type="file"
              name="avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
              required
              className="w-full text-gray-700 border border-gray-300 rounded-lg p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Create Employee
          </button>
        </form>
      ) : (
        <h1 className="text-2xl font-bold text-gray-700">Loading...</h1>
      )}
    </div>
  );
};

export default CreateEmployee;
