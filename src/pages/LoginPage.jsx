import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/users.js";
import { fetchUserById } from "../redux/features/user/userThunks.js";
import { useSelector, useDispatch } from "react-redux";

function LoginPage({ userToken }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.entireUser?.user);
  const [invalidLoginAttempt, setInvalidLoginAttempt] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validLogin = await loginUser(formData);
    if (!validLogin) {
      setInvalidLoginAttempt(true);
      return;
    }
    setInvalidLoginAttempt(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="page-container bg-gray-600">
      <div className="login-form flex justify-center items-center bg-gray-600 xs:flex-col md:flex-row gap-6 h-8 items-center justify-center w-full">
      <form className="flex flex-col gap-6 h-8 " onSubmit={handleSubmit}>
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
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full"
            color="teal"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      {invalidLoginAttempt ? (
        <div className="flex justify-center">
          Invalid username or password. Please try again.
        </div>
      ) : null}
    </div>
  );
}

<Link to="/register">Signup</Link>;

export default LoginPage;
