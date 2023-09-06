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
      const id = user.user_id;
      const fetchUser = async () => {
        const individualUser = await getUserById(id);
        setUserData({
          username: individualUser.user_string || "",
          email: individualUser.email || "",
          password: individualUser.password || "",
          id: id,
        });
      };
      fetchUser();
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

  const handleUpdateClick = async () => {
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
      const id = userData.id;
      await updateUsername(id, userData.username);
      await updateEmail(id, userData.email);
      await updatePassword(id, userData.password);
    } else {
      setPasswordMatch(false);
    }
  };

  return (
    <div>
      <Typography className="flex justify-center items-center text-3xl py-5 text-white">
        Account Settings
      </Typography>
      <div className="flex justify-center ">
        <form className="flex justify-center mb-2 pt-5 w-2/4 bg-meme-gray">
          <div className="flex flex-col gap-6 justify-center items-center">
            <label className="text-white" htmlFor="username">
              Username
            </label>
            {isEditMode ? (
              <input
                type="text"
                value={userData.username}
                name="username"
                onChange={handleChange}
              />
            ) : (
              <span className="text-yellow-400">{userData.username}</span>
            )}
            <label className="text-white" htmlFor="email">
              Email
            </label>
            {isEditMode ? (
              <input
                type="email"
                value={userData.email}
                name="email"
                onChange={handleChange}
              />
            ) : (
              <span className="text-yellow-400">{userData.email}</span>
            )}
            {isEditMode && (
              <>
                <label className="text-white" htmlFor="password">
                  Password
                </label>
                <div className="flex items-center text-white">
                  <input
                    type="password"
                    value={userData.password}
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <label className="text-white" htmlFor="confirm-password">
                  Confirm Password
                </label>
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
              <div className="mt-4 mb-5">
                <button
                  className="px-4 py-2 mr-2 bg-meme-teal text-white"
                  onClick={handleUpdateClick}
                >
                  Update
                </button>
                <button
                  className="px-4 py-2 bg-gray-300"
                  onClick={() => setIsEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="px-4 py-2 bg-meme-teal text-white mb-5"
                onClick={handleEditClick}
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
