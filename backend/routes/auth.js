const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Harryisagood$boy";

// ROUTE 1 :Create a user using : post "/api/auth/createuser". Doesn't require auth - no login required
router.post(
  '/createuser',
  [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
  ],
  async (req, res) => {
    let Success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Check whether the user with this email already exists
    try {
      let user = await User.findOne({Success, email: req.body.email });
      if (user) {
        return res.status(400).json({ Success, error: "Sorry, a user with this email already exists" });
      }

      // Create the new user with the hashed password
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });

      const data = {
        user: {
          id: user.id
        }
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
       Success = true;

      return res.status(201).json({Success, authtoken });
    } catch (error) {
      console.error(error.message);
      if (!res.headersSent) {
        return res.status(500).send('Internal Server Error');
      }
    }
  }
);

//ROUTE2 : Login a user using : post "/api/auth/login". Doesn't require auth - no login required
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
  ],
  async (req, res) => {
    let Success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        Success = false;
        return res.status(400).json({Success ,error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id
        }
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      Success = true;
      return res.json({Success, authtoken });
      
    } catch (error) {
      console.error(error.message);
      if (!res.headersSent) {
        return res.status(500).send('Internal Server Error');
      }
    }
  }
);

//ROUTE3 :  get logged in user details : post "/api/auth/getuser". - login required

router.get(
  '/getuser',fetchuser,
  // [
  //   // body('email', 'Enter a valid email').isEmail(),
  //   // body('password', 'Password cannot be blank').exists()
  // ],
  async (req, res) => {
  try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
   } catch (error) {
  console.error(error.message);
       
     res.status(500).send('Internal Server Error');
     
}

  })



module.exports = router;
