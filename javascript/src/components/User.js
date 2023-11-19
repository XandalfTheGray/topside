import React, { useState, useEffect } from 'react';
import axios from 'axios';

function User() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Replace 'user@example.com' with the actual email of the logged-in user
    const userEmail = 'user@example.com';

    axios.get(`http://localhost:3000/api/user/${userEmail}`)
      .then(response => {
        setUserData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch user data');
        setIsLoading(false);
        console.error('There was an error!', error);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Email: {userData.email}</p>
      {/* Add more fields as needed based on the user data */}
    </div>
  );
}

export default User;
