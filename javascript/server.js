const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

// Simulated in-memory database
const users = {}; // Key: email, Value: password hash

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user already exists
  if (users[email]) {
    return res.status(400).json({ status: 'error', message: 'User already exists' });
  }

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Store the new user
    users[email] = hashedPassword;

    res.status(201).json({ status: 'success', message: 'User registered' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  if (!users[email]) {
    return res.status(400).json({ status: 'error', message: 'User does not exist' });
  }

  try {
    // Compare the hashed password with the one stored in our database
    const isMatch = await bcrypt.compare(password, users[email]);
    if (isMatch) {
      res.json({ status: 'success', message: 'Logged in successfully' });
    } else {
      res.status(400).json({ status: 'error', message: 'Invalid password' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
