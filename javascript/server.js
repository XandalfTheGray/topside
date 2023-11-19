const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// Define a schema for the User
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, passwordHash: hashedPassword });
    await user.save();

    res.status(201).json({ status: 'success', message: 'User registered' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ status: 'error', message: 'Email already exists' });
    }
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(400).json({ status: 'error', message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (isMatch) {
      res.json({ status: 'success', message: 'Logged in successfully' });
    } else {
      res.status(400).json({ status: 'error', message: 'Invalid password' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// User data endpoint
app.get('/api/user/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).exec();
    if (user) {
      res.json({ email: user.email });
    } else {
      res.status(404).json({ status: 'error', message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
