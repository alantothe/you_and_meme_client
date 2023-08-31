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
    <div className="flex justify-center items-center bg-gray-600"
    style={{ height: "91vh" }}>
      <Card color="transparent" shadow={false}>

        <Typography className="mb-2 text-2xl"variant="h4" color="blue-gray">
          Sign Up
        </Typography>

        <Typography color="gray" className="mt-1 font-normal text-gray-100 font-bold">
          Enter your details to register.
        </Typography>

        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <label className="text-gray-100 font-bold"htmlFor="username">Username</label>
            <input className="border-2 border-teal-500 rounded-md bg-teal-50"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label className="text-gray-100 font-bold" htmlFor="email">Email</label>
            <input className="border-2 border-teal-500 rounded-md bg-teal-50"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label className="text-gray-100 font-bold" htmlFor="password">Password</label>
            <input className="border-2 border-teal-500 rounded-md bg-teal-50"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label className="text-gray-100 font-bold" htmlFor="passwordConfirmation">Confirm Password</label>
            <input className="border-2 border-teal-500 rounded-md bg-teal-50"
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              required
            />
          </div>

          <Button color="teal" onClick={handleSubmit} className="mt-6 font-bold" fullWidth>
            Register
          </Button>

          <Typography color="gray" className="mt-4 text-center font-normal text-gray-100 font-bold">
            Already have an account?{" "}
            <a href="/login" className="font-bold text-gray-900 hover:text-teal-500">
              Sign In
            </a>
          </Typography>
        </form>

      </Card>
    </div>
  );
}

export default RegisterPage;