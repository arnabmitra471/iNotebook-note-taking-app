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
        const secPass = await bcrypt.hash(req.body.password,salt);
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
        const auth_token = jwt.sign(data,JWT_SECRET)
        console.log(auth_token)
        res.json({auth_token})
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send("Some error occured")
    }
})


module.exports = router