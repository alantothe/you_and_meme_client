import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api/users";

function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
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
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

<Link to="/register">Signup</Link>;

export default LoginPage;
