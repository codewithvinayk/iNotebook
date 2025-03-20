const express = require('express');
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const router = express.Router();
var fetchuser = require('../middlewares/fetchuser')

const JWT_SECRET = 'Vinayisagoodb$oy';

//Route:1 - Create a User using: POST "/api/auth/createuser". No login required.
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characterE').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  //If there are errors, then return Bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  try {
    //Check whether the user with this email exists already 
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
    }

    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hashSync(req.body.password, salt);

    //Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })

    const data = {
      user: {
        id: user.id,
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);

    // res.json(user);
    let success = true;
    res.json({ success, authToken });

  } catch (error) {
    console.log(error.message)
    res.status(500).send('Internal Server Error')
  }
});

//Route:2 - Authenticate a User using: POST "/api/auth/login". No login required.
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password can not be blank').exists(),
], async (req, res) => {
  let success = false;
  //If there are errors, then return Bad request and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    //Check whether the user with this email exists or not 
    let user = await User.findOne({ email })
    if (!user) {
      success = false;
      return res.status(400).json({ success, error: "Please try to login with the correct credentials" })
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({ success, error: "Please try to login with the correct credentials" })
    }

    const data = {
      user: {
        id: user.id,
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);

    // res.json(user);
    success = true;
    res.json({ success, authToken });

  } catch (error) {
    console.log(error.message)
    res.status(500).send('Internal Server Error')
  }
});

//Route:3 - Get loggedin User details using: POST "/api/auth/getuser". Login required.
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Internal Server Error')
  }
});


module.exports = router;