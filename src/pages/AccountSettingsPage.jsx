import { useState, useEffect } from "react";
import { Card, Typography } from "@material-tailwind/react";
import {
  getUserById,
  updateUsername,
  updatePassword,
  updateEmail,
} from "../api/users";

const AccountSettingsPage = ({ user }) => {
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    id: 0,
  });

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || "",
        email: user.email || "",
        password: user.password || "",
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleUpdateClick = () => {
    console.log(
      "Updated:",
      userData.username,
      userData.email,
      userData.password
    );
    if (userData.password === passwordConfirmation) {
      console.log(
        "Updated:",
        userData.username,
        userData.email,
        userData.password
      );
      setIsEditMode(false);
      setPasswordMatch(true);
      user = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      };
    } else {
      setPasswordMatch(false);
    }
  };

  return (
    <>
      <Card color="bg-gray-600" shadow={false}>
        <Typography variant="h4" color="white">
          Account Settings
        </Typography>
        <form className="mt-8 mb-2 w-80 w-screen">
          <div className="flex flex-col gap-6 flex justify-center items-center bg-gray-600">
            <label htmlFor="username">Username</label>
            {isEditMode ? (
              <input
                type="text"
                value={userData.username}
                name="username"
                onChange={handleChange}
              />
            ) : (
              <span>{userData.username}</span>
            )}
            <label htmlFor="email">Email</label>
            {isEditMode ? (
              <input
                type="email"
                value={userData.email}
                name="email"
                onChange={handleChange}
              />
            ) : (
              <span>{userData.email}</span>
            )}
            {isEditMode && (
              <>
                <label htmlFor="password">Password</label>
                <div className="flex items-center">
                  <input
                    type="password"
                    value={userData.password}
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <label htmlFor="confirm-password">Confirm Password</label>
                <div className="flex items-center">
                  <input
                    type="password"
                    value={passwordConfirmation}
                    name="confirm-password"
                    onChange={handlePasswordConfirmationChange}
                  />
                </div>
              </>
            )}
            {isEditMode ? (
              <div className="mt-4">
                <button
                  className="px-4 py-2 mr-2 bg-blue-700 text-white rounded"
                  onClick={handleUpdateClick}
                >
                  Update
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setIsEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="px-4 py-2 bg-green-700 text-white rounded"
                onClick={handleEditClick}
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </Card>
    </>
  );
};

export default AccountSettingsPage;
