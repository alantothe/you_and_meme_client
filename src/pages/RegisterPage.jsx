import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Typography } from "@material-tailwind/react";
import { registerUser } from "../api/users";
import { useDropzone } from "react-dropzone";
import Avatar from "react-avatar";

function RegisterPage() {
  const navigate = useNavigate();
  const [avatarURL, setAvatarURL] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: async (acceptedFiles) => {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      formData.append("upload_preset", "fzfav2ym");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dzjr3skhe/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        setAvatarURL(data.secure_url);
      } catch (error) {
        console.error("Error uploading the image:", error);
      }
    },
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

    if (formData.password === formData.passwordConfirmation) {
      setPasswordMatch(true);
      const passedFormData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        avatar: avatarURL, // Add the avatarURL here
      };
      registerUser(passedFormData);
      navigate("/sign-in");
    } else {
      setPasswordMatch(false);
    }
  };

  const navToLogin = () => {
    navigate("/sign-in");
  };

  return (
    <div className="flex justify-center items-center bg-gray-600">
      <Card color="transparent" shadow={false}>
        <Typography className="mb-2 text-2xl" variant="h4" color="blue-gray">
          Sign Up
        </Typography>

        {passwordMatch && (
          <Typography
            color="gray"
            className="mt-1 font-normal text-gray-100 font-bold"
          >
            Enter your details to register.
          </Typography>
        )}

        {!passwordMatch && (
          <Typography color="red" className="mt-1">
            Passwords do not match. Enter your details to register.
          </Typography>
        )}
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
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

            <label className="text-gray-100 font-bold" htmlFor="email">
              Email
            </label>
            <input
              className="border-2 border-teal-500 rounded-md bg-teal-50"
              type="email"
              id="email"
              name="email"
              value={formData.email}
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

            <label
              className="text-gray-100 font-bold"
              htmlFor="passwordConfirmation"
            >
              Confirm Password
            </label>
            <input
              className={`border-2 border-teal-500 rounded-md bg-teal-50 ${
                !passwordMatch ? "border-red-500" : ""
              }`}
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              required
            />

            <label className="text-gray-100 font-bold">
              Upload your avatar:
            </label>

            <div
              {...getRootProps()}
              className={`dropzone relative ${
                isDragActive ? "dropzoneActive" : ""
              } border-2 border-teal-500 rounded-md bg-teal-50 p-20 text-center`}
            >
              <input {...getInputProps()} />
              {avatarURL ? (
                <div className="mx-auto w-36 h-36 rounded-full overflow-hidden">
                  <img
                    src={avatarURL}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag and drop some files here, or click to select files</p>
              )}

              {avatarURL && (
                <div className="mt-2 text-center text-2xl font-bold ">
                  Use this Avatar?
                </div>
              )}
            </div>
          </div>
          <Button
            color="teal"
            onClick={handleSubmit}
            className="mt-6 font-bold"
            fullWidth
          >
            Register
          </Button>

          <Typography
            color="gray"
            className="mt-4 text-center font-normal text-gray-100 font-bold"
          >
            Already have an account?{" "}
            <Typography
              onClick={navToLogin}
              className="font-bold text-gray-900 hover:text-teal-500"
            >
              Sign In
            </Typography>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default RegisterPage;
