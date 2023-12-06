const express = require("express");
const router = express.Router();
const User = require("../models/Users")
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser")
require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET
// Route 1: Create a user using POST "/api/auth" No login required

router.post("/createuser", [
    // Applying validation based on the fields in our schema
    body("name", "Please enter a valid name").isLength({ min: 3 }),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Please enter a valid password").isLength({ min: 5 })
], async (req, res) => {
    // If there are errors then return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        // check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        // Hashing the password of the user with the salt included
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET)
        console.log(auth_token)
        res.json({ auth_token })
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server error");
    }
})

//  Route 2: Authenticate a user using POST "/api/auth/login" No login required

router.post("/login", [
    // Applying validation based on the fields in our schema
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Please enter a valid password").exists()
], async (req, res) => {
    // if there are errors then return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // Taking the values of email and password fields out of req.body by using object destructuring
    const {email,password} = req.body

    try
    {
        let user = await User.findOne({email:email})
        if(!user)
        {
            return res.status(400).json({error: "Please try to login with correct credentials"})
        }
        const passCompare = await bcrypt.compare(password,user.password)

        if(!passCompare)
        {
            return res.status(400).json({error: "Please try to login again with correct credentials"})
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const auth_token = jwt.sign(data, JWT_SECRET,{expiresIn: "2d"})
        res.json({ auth_token })
    }
    catch(err)
    {
        console.error(err.message);
        res.status(500).send("Internal Server error");
    }
})

// Route 3: Get logged in user details. Login Required

router.post("/getUser",fetchUser,async (req,res)=>{
    try
    {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    }
    catch(err)
    {
        console.log(err.message);
        return res.status(500).json({error:"Internal Server Error"})
    }
})
module.exports = router