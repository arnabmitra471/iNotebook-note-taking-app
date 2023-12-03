const express = require("express");
const router = express.Router();
const User = require("../models/Users")
const {body,validationResult} = require("express-validator")

// Create a user using POST "/api/auth"
router.post("/createuser",[
    // Applying validation based on the fields in our schema
    body("name","Please enter a valid name").isLength({min: 3}),
    body("email","Please enter a valid email").isEmail(),
    body("password","Please enter a valid password").isLength({min:5})
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()})
    }
    // check whether the user with this email exists already
    try
    {
    let user = await User.findOne({email: req.body.email})
    if(user)
    {
      return res.status(400).json({error:"Sorry a user with this email already exists"})  
    }
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    console.log(user)
    res.json({success: "User Added"})
    }
    catch(err)
    {
        console.error(err.message)
        res.status(500).send("Some error occured")
    }
})


module.exports = router