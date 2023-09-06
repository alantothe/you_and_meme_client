import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/users.js";
import { fetchUserById } from "../redux/features/user/userThunks.js";
import { useSelector, useDispatch } from "react-redux";

function LoginPage({}) {
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
    <div className="page-container">
      <div className="flex flex-col justify-center items-center mt-60 gap-6 h-8 w-full">
        <form
          className="flex flex-col gap-6 p-2 bg-gray-600 p-4 rounded"
          onSubmit={handleSubmit}
        >
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
            className="bg-teal-500 hover:bg-teal-300 text-white font-bold py-1 px-4 rounded-full"
            color="teal"
            type="submit"
          >
            Login
          </button>
        </form>
        {invalidLoginAttempt ? (
          <div className="flex justify-center text-center text-white">
            Invalid username or password. Please try again.
          </div>
        ) : null}
      </div>
    </div>
  );
}

<Link to="/register">Signup</Link>;

export default LoginPage;
