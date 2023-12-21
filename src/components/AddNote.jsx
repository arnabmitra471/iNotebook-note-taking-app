import React from 'react'
import NoteContext from '../context/notes/NoteContext'
import { useState,useContext} from 'react';
const AddNote = () => {
    const noteContext = useContext(NoteContext);
    const { addNote } = noteContext;
    const [note,setNote] = useState({title: "",description: "",tag:"default"})
    const handleAdd = (e)=>{
        e.preventDefault();
        console.log("Adding a new note");
        addNote(note.title,note.description,note.tag);
    }
    const handleOnChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <div className="container my-3">
                <h2 className="text-decoration-underline">Add a Note</h2>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={handleOnChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={handleOnChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={handleOnChange}/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleAdd}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote