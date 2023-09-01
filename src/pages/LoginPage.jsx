import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/users";

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
    // window.location.reload(); // Comment in if necessary to update the icon color
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label className="text-gray-100 font-bold" htmlFor="username">
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

        <button color="teal" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

<Link to="/register">Signup</Link>;

export default LoginPage;
