const express = require("express");
const router = express.Router();
const User = require("../models/Users")
const {query} = require("express-validator")

// Create a user using POST "/api/auth"
router.post("/createuser",[
    // Applying validation based on the fields in our schema
    query("name").isLength({min: 3}),
    query("email").isEmail(),
    query("password").isLength({min:5})
],async(req,res)=>{
    console.log(req.body);
    try
    {
    let userData = await User.findOne({email: req.body.email})
    console.log(userData)
    if(userData)
    {
        return res.status(400).json({error: "Sorry a User with this email already exists"})
    }
    else
    {
    const user = User(req.body)
    user.save();
    res.send(req.body)
    }
}
catch(err)
{
    console.error(err.message);
    res.status(500).send("Some error occured")
}
})

module.exports = router