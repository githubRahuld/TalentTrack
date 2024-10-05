import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const EmployeeList = ({ employees }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: [], // Change to array for radio buttons
    courses: [], // Change to array for multi-selector
    avatar: null,
  });

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setFormValues({
      name: employee.name,
      email: employee.email,
      mobileNo: employee.mobileNo,
      designation: employee.designation,
      gender: employee.gender ? [employee.gender] : [], // Ensure it's an array
      courses: employee.courses, // Ensure it's an array
      avatar: null,
    });
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("email", formValues.email);
    formData.append("mobileNo", formValues.mobileNo);
    formData.append("designation", formValues.designation);
    formData.append("gender", formValues.gender[0]); // Send only the selected gender
    formData.append("courses", formValues.courses); // Send array of courses

    if (formValues.avatar) {
      formData.append("avatar", formValues.avatar);
    }

    try {
      await axios.patch(
        `${baseUrl}/api/v1/admins/edit/${selectedEmployee._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      setLoading(false);
      setIsEditing(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormValues({ ...formValues, avatar: e.target.files[0] });
  };

  const handleGenderChange = (e) => {
    const { value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      gender: [value], // Set gender to an array containing the selected value
    }));
  };

  const handleCourseChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setFormValues((prev) => ({
      ...prev,
      courses: selectedOptions,
    }));
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/api/v1/admins/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      setLoading(false);
      console.log(res);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {}, [handleDelete]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Employee List
      </h3>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {employees.length > 0 ? (
            employees.map((employee) => (
              <li
                key={employee._id}
                className="px-6 py-4 flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={employee.avatar}
                    alt={`${employee.name}'s avatar`}
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      {employee.name}
                    </p>
                    <p className="text-sm text-gray-600">{employee.email}</p>
                    <p className="text-sm text-gray-600">{employee.gender}</p>
                    <p className="text-sm text-gray-600">
                      {employee.courses.join(", ")}
                    </p>
                    {/* Added Created At Field */}
                    <p className="text-sm text-gray-500">
                      Created At:{" "}
                      {new Date(employee.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    <p>{employee.mobileNo}</p>
                    <p className="font-medium text-blue-500">
                      {employee.designation}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="p-6 text-gray-500 text-center">
              No employees available
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default EmployeeList;
