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
import DevelopmentPage from "./pages/DevelopmentPage.jsx";
import Nav from "./layout/Nav.jsx";
import { verifyUser } from "./api/users.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserById } from "./redux/features/user/userThunks.js";

const App = () => {
  const [user, setUser] = useState(null);
  const [mobileView, setMobileView] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyUser();
      if (user) {
        setUser(user);
        dispatch(fetchUserById(user.user_id));
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  const handleResize = () => {
    if (window.innerWidth < 720) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear().toString().slice(2);
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (hours === 0) {
      return `${months[month]} ${day}, ${year} at ${hours + 12}:${minutes}AM`;
    } else if (hours < 12) {
      return `${months[month]} ${day}, ${year} at ${hours}:${minutes}AM`;
    } else if (hours === 12) {
      return `${months[month]} ${day}, ${year} at ${hours}:${minutes}PM`;
    } else {
      return `${months[month]} ${day}, ${year} at ${hours - 12}:${minutes}PM`;
    }
  };

  return (
    <div>
      <Nav user={user} handleLogOut={handleLogOut} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              user={user}
              mobileView={mobileView}
              handleResize={handleResize}
              formatTimestamp={formatTimestamp}
            />
          }
        />
        <Route
          path="/account-settings"
          element={<AccountSettingsPage user={user} />}
        />
        <Route
          path="/create-meme/:id"
          element={<CreateMemePage user={user} />}
        />
        <Route
          path="/sign-in"
          element={
            <LoginPage
              userToken={user}
              mobileView={mobileView}
              handleResize={handleResize}
            />
          }
        />
        <Route
          path="/memes/:postId"
          element={
            <MemeDetailPage
              userToken={user}
              formatTimestamp={formatTimestamp}
            />
          }
        />
        <Route
          path="/meme-selection"
          element={<MemeSelectionPage user={user} />}
        />
        <Route
          path="/profile/:profileId"
          element={
            <ProfilePage
              userToken={user}
              mobileView={mobileView}
              handleResize={handleResize}
              formatTimestamp={formatTimestamp}
            />
          }
        />
        <Route path="/register" element={<RegisterPage user={user} />} />
        <Route
          path="/meme-detail-page/:postId"
          element={
            <MemeDetailPage
              user={user}
              mobileView={mobileView}
              handleResize={handleResize}
              formatTimestamp={formatTimestamp}
            />
          }
        />
        <Route path="/development" element={<DevelopmentPage />} />
      </Routes>
    </div>
  );
};

export default App;
