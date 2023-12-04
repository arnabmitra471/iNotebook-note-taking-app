const express = require("express");
const router = express.Router();
const User = require("../models/Users")
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
// Create a user using POST "/api/auth"

const JWT_SECRET = "Fd5$gkloPjAsRtsxZa"
router.post("/createuser", [
    // Applying validation based on the fields in our schema
    body("name", "Please enter a valid name").isLength({ min: 3 }),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Please enter a valid password").isLength({ min: 5 })
], async (req, res) => {
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

// Authenticate a user using POST "/api/auth/login"

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
    // Taking the values of email and password fields out of req.body by using array destructuring
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
        const auth_token = jwt.sign(data, JWT_SECRET)
        res.json({ auth_token })
    }
    catch(err)
    {
        console.error(err.message);
        res.status(500).send("Internal Server error");
    }
})
module.exports = router