import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Typography,
} from "@material-tailwind/react";
 
function RegisterPage() {
  const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      });

      const handleChange = (event) => {
            const { name, value } = event.target;
            setFormData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          };

  const handleSubmit = () => {
        // Sign up logic here
        console.log("Form submitted:", formData);
      };

  return (
    <div className="flex justify-center">
      <Card color="transparent" shadow={false}>

        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>

        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>

        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
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

            <label htmlFor="passwordConfirmation">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              required
            />
          </div>

          <Button onClick={handleSubmit} className="mt-6 color" fullWidth>
            Register
          </Button>

          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-gray-900">
              Sign In
            </a>
          </Typography>
        </form>

      </Card>
    </div>
  );
}

export default RegisterPage;