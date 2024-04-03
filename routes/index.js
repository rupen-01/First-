var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../database/db');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  res.send('home');
});

// SIGNUP
router.post('/signup', async (req, res) => { 
  const { username, email, password, role } = req.body;
  
  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
});


// LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json('User not found');
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json('Wrong password');
    }
     // Generate JWT token
     const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' }); 
    
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error logging in');
  }
});

module.exports = router;
