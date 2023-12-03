const mongoose = require("mongoose");
const User = require("./Users");

const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

User.createIndexes()
module.exports = mongoose.model("Notes",NotesSchema)