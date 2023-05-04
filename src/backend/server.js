const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const isPasswordValid = await user.isPasswordValid(password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Logged in successfully.', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

app.get('/api/check-auth', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token is invalid or expired.' });
    }

    res.status(200).json({ message: 'Token is valid.', userId: decoded.id });
  });
});

app.put('/api/update-profile', [
  body('currentUsername').notEmpty().withMessage('Current username is required.'),
  body('currentPassword').notEmpty().withMessage('Current password is required.'),
  body('newUsername').notEmpty().withMessage('New username is required.'),
  body('newPassword').notEmpty().withMessage('New password is required.'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, currentUsername, currentPassword, newUsername, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
  
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }
  
    // Check if the current username and password match the user's records
    if (user.username !== currentUsername || !(await user.comparePassword(currentPassword))) {
      return res.status(400).json({ message: 'Current username or password is incorrect.' });
    }
  
    user.username = newUsername;
    user.password = await user.hashPassword(newPassword); // Use the hashPassword method
    await user.save();
  
    res.status(200).json({ message: 'Profile updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../../build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
