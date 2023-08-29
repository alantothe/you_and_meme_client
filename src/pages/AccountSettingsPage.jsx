import React, { useState } from 'react';


const AccountSettingsPage = () => {
  const [username, setUsername] = useState('currentUsername');
  const [email, setEmail] = useState('currentEmail');
  const [currentPassword, setCurrentPassword] = useState('currentPassword');
  const [newPassword, setNewPassword] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleUpdateClick = () => {
    // Here you can implement the logic to update the user's information on the server.
    // You can use APIs or any other method to communicate with your backend.
    // After successfully updating, you might want to show a success message to the user.
    setIsEditMode(false);
    console.log('Updated:', { username, email, newPassword });
  };

  return (
    <div>
      <h1>Account Settings</h1>
      <label>
        Username:
        {isEditMode ? (
          <input type="text" value={username} onChange={handleUsernameChange} />
        ) : (
          <span>{username}</span>
        )}
      </label>
      <br />
      <label>
        Email:
        {isEditMode ? (
          <input type="email" value={email} onChange={handleEmailChange} />
        ) : (
          <span>{email}</span>
        )}
      </label>
      <br />
      <label>
        Current Password:
        {isEditMode ? (
          <input type="password" value={currentPassword} disabled />
        ) : (
          <span>********</span>
        )}
      </label>
      <br />
      {isEditMode && (
        <>
          <label>
            New Password:
            <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
          </label>
          <br />
        </>
      )}
      {isEditMode ? (
        <>
          <button onClick={handleUpdateClick}>Update</button>
          <button onClick={() => setIsEditMode(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
};

export default AccountSettingsPage;
