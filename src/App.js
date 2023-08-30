import React from "react";
import { Routes, Route } from "react-router-dom";
import AccountSettingsPage from "./pages/AccountSettingsPage.jsx";
import CreateMemePage from "./pages/CreateMemePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import MemeDetailPage from "./pages/MemeDetailPage.jsx";
import MemeSelectionPage from "./pages/MemeSelectionPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Nav from "./components/Nav.jsx";

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account-settings" element={<AccountSettingsPage />} />
        <Route path="/create-meme/:id" element={<CreateMemePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/memes/:postId" element={<MemeDetailPage />} />
        <Route path="/meme-selection" element={<MemeSelectionPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/meme-detail-page" element={<MemeDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
