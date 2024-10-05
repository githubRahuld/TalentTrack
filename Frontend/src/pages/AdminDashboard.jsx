import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeList from "../components/EmployeeList";
import Cookies from "js-cookie";

const AdminDashboard = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      await axios
        .get(`${baseUrl}/api/v1/admins/all-employees`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        })
        .then((res) => {
          setLoading(false);
          setEmployees(res.data.data);
          console.log("All employees: ", res.data.data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    fetchEmployees();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-gray-800 my-6">
        Admin Dashboard
      </h1>

      {loading ? <h1>Loading...</h1> : <EmployeeList employees={employees} />}
    </div>
  );
};

export default AdminDashboard;
