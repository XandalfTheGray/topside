const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// MongoDB Connection
// Updated connection string to point to the 'topside' database
mongoose.connect('mongodb://localhost:27017/topside', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// Error handling for MongoDB connection
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
  process.exit(-1); // Exit the process in case of connection error
});

// User Schema and Model
// Defines the schema for the 'users' collection
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true }
});

// Creating a model from the schema to interact with the 'users' collection
const User = mongoose.model('User', userSchema);

// Registration Endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, passwordHash: hashedPassword });
    await user.save();

    res.status(201).json({ status: 'success', message: 'User registered' });
  } catch (err) {
    if (err.code === 11000) {
      // Handling duplicate email error
      return res.status(400).json({ status: 'error', message: 'Email already exists' });
    }
    // General error handler
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();

    if (!user) {
      // User not found
      return res.status(400).json({ status: 'error', message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (isMatch) {
      // Successful login
      res.json({ status: 'success', message: 'Logged in successfully' });
    } else {
      // Incorrect password
      res.status(400).json({ status: 'error', message: 'Invalid password' });
    }
  } catch (err) {
    // General error handler
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// User Data Endpoint
app.get('/api/user/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }, '-passwordHash').exec();
    if (user) {
      // Returning user data, excluding passwordHash
      res.json(user);
    } else {
      // User not found
      res.status(404).json({ status: 'error', message: 'User not found' });
    }
  } catch (err) {
    // General error handler
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Server Listening on Port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
