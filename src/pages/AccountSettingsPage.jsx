import React, { useState, useEffect } from 'react';
 
const AccountSettingsPage = ({user}) => { 

  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || '',
        email: user.email || '',
        password: user.password || ''
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleUpdateClick = () => {
    console.log('Updated:', userData.username, userData.email, userData.password)
    if (userData.password === passwordConfirmation) {
      setIsEditMode(false);
      setPasswordMatch(true);
      user = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      }
    } else {
      setPasswordMatch(false);
    }
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
                <input type="text" value={userData.username} name="username" onChange={handleChange} />
              ) : (
                <span>{userData.username}</span> 
              )}
            </div>
            <div className="flex items-center justify-end">Email:</div>
            <div className="flex items-center">
              {isEditMode ? (
                <input type="email" value={userData.email} name="email" onChange={handleChange} />
              ) : (
                <span>{userData.email}</span> 
              )}
            </div>
            {isEditMode && (
              <>
                <div className="flex items-center justify-end">Password:</div>
                <div className="flex items-center">
                    <input type="password" value={userData.password} name="password" onChange={handleChange} />
                </div>  
                <div className="flex items-center justify-end">Confirm Password:</div>
                <div className="flex items-center">
                  <input type="password" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} />
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
