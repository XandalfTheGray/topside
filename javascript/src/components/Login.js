// Import necessary libraries
import React, { useState } from 'react'; // useState is a Hook that lets you add React state to function components
import axios from 'axios'; // axios is a library for making HTTP requests

// Define the Login component
function Login() {
  // Create state variables for username and password
  const [username, setUsername] = useState(''); // The initial value is an empty string
  const [password, setPassword] = useState(''); // The initial value is an empty string

  // Define the function to be called when the form is submitted
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Send a POST request to '/api/login' with the username and password as data
    const response = await axios.post('/api/login', { username, password });

    // TODO: Handle the response. This might involve setting more state variables,
    // redirecting the user to another page, or other side effects.
  };

  // Render the component
  return (
    // When the form is submitted, call the handleSubmit function
    <form onSubmit={handleSubmit}>
      {/* When the value of the input field changes, update the username state variable */}
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />

      {/* When the value of the input field changes, update the password state variable */}
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

      {/* This button submits the form */}
      <button type="submit">Log In</button>
    </form>
  );
}

// Export the Login component so it can be imported and used in other files
export default Login;