const express = require("express");
const router = express.Router();
const Note = require("../models/Note")
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser")

// Route 1: fetch all notes of a user using GET /api/notes/fetchallnotes Login Required

router.get("/fetchallnotes", fetchUser, async (req, res) => {
    try
    {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    }
    catch(err)
    {
        console.error(err.message);
        res.status(500).send("Internal Server error");
    }
})

// Route 2: add a new note using POST /api/notes/addnote Login required

router.post("/addnote", fetchUser, [
    body("title", "Please enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({ min: 5 }),
    body("tag", "Please enter a valid tag").isLength({ min: 3 })
],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { title, description, tag } = req.body;
            const note = new Note({
                title, description, tag,user: req.user.id
            })
            const savedNote = await note.save();

            res.json(savedNote);
        }
        catch(err)
        {
            console.error(err.message);
            res.status(500).send("Internal Server error");
        }
    })
module.exports = router