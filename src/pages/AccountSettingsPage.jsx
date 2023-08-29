import React, { useState } from 'react';

const mockdata = {
  username: "danish", 
  email: "danish@gmail.com",
  password: "danish123"
}
 
const AccountSettingsPage = () => { 
  const [username, setUsername] = useState(mockdata.username);
  const [email, setEmail] = useState(mockdata.email);
  const [currentPassword, setCurrentPassword] = useState('mockdata.Password');
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
    setIsEditMode(false);
    console.log('Updated:', { username, email, newPassword });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-red-600">
  
      <div className="bg-blue-400 p-6 rounded-lg shadow-md w-2/3">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 mt-8">Account Settings</h1>
          <div className="grid grid-cols-2 gap-4 text-2xl">
            <div className="flex items-center justify-end">Username:</div>
            <div className="flex items-center">
              {isEditMode ? (
                <input type="text" value={username} onChange={handleUsernameChange} />
              ) : (
                <span>{username}</span> 
              )}
            </div>
            <div className="flex items-center justify-end">Email:</div>
            <div className="flex items-center">
              {isEditMode ? (
                <input type="email" value={email} onChange={handleEmailChange} />
              ) : (
                <span>{email}</span> 
              )}
            </div>
            <div className="flex items-center justify-end">Current Password:</div>
            <div className="flex items-center">
              {isEditMode ? (
                <input type="password" value={currentPassword} disabled />
              ) : (
                <span>********</span> 
              )}
            </div>
            {isEditMode && (
              <>
                <div className="flex items-center justify-end">New Password:</div>
                <div className="flex items-center">
                  <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
                </div>
              </>
            )}
          </div>
          
          {isEditMode ? (
            <div className="mt-4">
              <button className="px-4 py-2 mr-2 bg-blue-700 text-white rounded" onClick={handleUpdateClick}>Update</button>
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setIsEditMode(false)}>Cancel</button>
            </div>
          ) : (
            <button className="px-4 py-2 bg-green-700 text-white rounded" onClick={handleEditClick}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
