const express = require("express");
const router = express.Router();
const Note = require("../models/Note")
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser")

// Route 1: fetch all notes of a user using GET /api/notes/fetchallnotes Login Required

router.get("/fetchallnotes", fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    }
    catch (err) {
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
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();

            res.json(savedNote);
        }
        catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server error");
        }
    })

// Route 3: update a note using PUT /api/notes/updatenote/:id Login required

router.put("/updatenote/:id", fetchUser, async (req, res) => {
    let { title, description, tag } = req.body
    //Create a newNote object
    try {
        let newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }
        // find the note by to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        // Allow updation only if the user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    }
    catch(err) {
        console.error(err.message);
        return res.status(500).send("Internal Server Error")
    }
})

// Route 4: delete a note using DELETE /api/notes/deletenote/:id Login required

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
    try {

        // find the note by to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        // Allow deletion only if the user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success":"The note has been deleted",note:note});
    }
    catch(err) {
        console.error(err.message);
        return res.status(500).send("Internal Server Error")
    }
})
module.exports = router