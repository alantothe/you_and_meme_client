import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/users.js";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Login Logic
    console.log("Login submitted:", formData);
    loginUser(formData);
    navigate("/");
    // window.location.reload();
  };

  return (
    <div className="page-container bg-gray-600">
      <div className="login-form flex justify-center items-center bg-gray-600">
        {/* <h2 className="mb-2 text-2xl" variant="h4" color="blue-gray">Login</h2> */}
        <form className="flex gap-6 h-8" onSubmit={handleSubmit}>
          <label
            className="flex-col text-gray-100 font-bold"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="border-2 border-teal-500 rounded-md bg-teal-50"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label className="text-gray-100 font-bold" htmlFor="password">
            Password
          </label>
          <input
            className="border-2 border-teal-500 rounded-md bg-teal-50"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            className="hover:text-teal-500 rounded-full"
            color="teal"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

<Link to="/register">Signup</Link>;

export default LoginPage;
