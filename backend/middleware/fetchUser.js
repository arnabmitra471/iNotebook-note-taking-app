const jwt = require("jsonwebtoken");
require("dotenv").config()


const fetchUser = (req, res, next) => {
    // Get the user from the jwt token and add id to the req object
    const token = req.header("auth-token");
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!token) {
        res.status(401).json({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET); // Decoding the token and fetching the payload from the token
        req.user = data.user
        next()
    }
    catch (err) {
        res.status(401).json({ error: "Please authenticate using a valid token" })
    }
}

module.exports = fetchUser