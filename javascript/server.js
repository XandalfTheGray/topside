const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // TODO: Check the username and password against your database
  // If they're valid, send a response like { status: 'success' }
  // If they're not valid, send a response like { status: 'error' }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});