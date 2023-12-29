import React ,{useContext}from 'react'
import NoteContext from '../context/notes/NoteContext'
const NoteItem = ({ note }) => {
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    return (
        <div className="col-md-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-regular fa-pen-to-square mx-2" style={{color: "#3d62a4"}}></i>
                    <i className="fa-regular fa-trash-can mx-2" style={{color: "#b04545"}} onClick={()=>{deleteNote(note._id)}}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem