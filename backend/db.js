const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/";


const connectToMongo = async ()=>{
    await mongoose.connect(mongoURI)
}

module.exports = connectToMongo