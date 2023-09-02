import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AccountSettingsPage from "./pages/AccountSettingsPage.jsx";
import CreateMemePage from "./pages/CreateMemePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MemeDetailPage from "./pages/MemeDetailPage.jsx";
import MemeSelectionPage from "./pages/MemeSelectionPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Nav from "./layout/Nav.jsx";
import { verifyUser } from "./api/users.js";
import { useNavigate } from "react-router-dom";
import { addUserToRedux } from "./redux/features/userSlice.js";
import { useDispatch } from "react-redux";

const App = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyUser();
      if (user) {
        setUser(user);
        dispatch(addUserToRedux(user));
      } else {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <Nav user={user} handleLogOut={handleLogOut} />
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route
          path="/account-settings"
          element={<AccountSettingsPage user={user} />}
        />
        <Route
          path="/create-meme/:id"
          element={<CreateMemePage user={user} />}
        />
        <Route path="/sign-in" element={<LoginPage user={user} />} />
        <Route path="/memes/:postId" element={<MemeDetailPage user={user} />} />
        <Route
          path="/meme-selection"
          element={<MemeSelectionPage user={user} />}
        />
        <Route
          path="/profile/:profileId"
          element={<ProfilePage loggedInUser={user} />}
        />
        <Route path="/register" element={<RegisterPage user={user} />} />
        <Route
          path="/meme-detail-page/:postId"
          element={<MemeDetailPage user={user} />}
        />
      </Routes>
    </div>
  );
};

export default App;
