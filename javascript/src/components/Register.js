import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation for password match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // API call to register the user
      const response = await axios.post('http://localhost:3000/api/register', { email, password });

      // Check for success status in the response
      if (response.data.status === 'success') {
        // Registration successful, you can redirect or show a success message
        console.log('User registered successfully:', response.data.message);
        // Redirect or show success message
      } else {
        // Registration failed with an error message from the server
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      // Handle different types of errors
      if (err.response) {
        // Server responded with an error status code
        console.error('Server error:', err.response.status, err.response.data);
        setError(err.response.data.message || 'Server error');
      } else if (err.request) {
        // Request was made but no response received
        console.error('No response from the server:', err.request);
        setError('No response from the server');
      } else {
        // Something else went wrong
        console.error('Error:', err.message);
        setError('An error occurred');
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
