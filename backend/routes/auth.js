const express = require("express");
const router = express.Router();
const User = require("../models/Users")
const {query} = require("express-validator")

// Create a user using POST "/api/auth"
router.post("/",[
    query("name").isLength({min: 3}),
    query("email").isEmail(),
    query("password").isLength({min:5})
],(req,res)=>{
    console.log(req.body);
    const user = User(req.body)
    user.save();
    res.send(req.body)
})

module.exports = router