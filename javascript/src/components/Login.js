import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Replace with your API endpoint as necessary
      const response = await axios.post('http://localhost:3000/api/login', { username, password });
      
      // Handle successful login
      // You might want to redirect the user or save the login data
      console.log('Login successful', response.data);

      // TODO: Redirect to another page or update the state as necessary
    } catch (error) {
      // Handle errors, such as showing login failure message
      setLoginError('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Log In</button>
      </form>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
