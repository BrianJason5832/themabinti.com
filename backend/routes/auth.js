const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    let user = await User.findOne({ $or: [{ userName }, { email }] });
    if (user) {
      if (user.userName === userName) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      if (user.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, userName: user.userName, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret', // Fallback for testing
      { expiresIn: '1h' }
    );

    res.json({ token, user: { userName: user.userName, email: user.email } });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;