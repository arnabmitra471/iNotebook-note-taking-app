import React, { useContext, useEffect,useRef,useState } from 'react'

import NoteItem from './NoteItem'
import AddNote from './AddNote'
import NoteContext from '../context/notes/NoteContext'
const Notes = () => {
  const noteContext = useContext(NoteContext)
  const { notes, getNotes } = noteContext;
  const ref = useRef("");
  const [note,setNote] = useState({etitle: "",edescription: "",etag:"default"})
  useEffect(() => {
    getNotes()
  }, [])
  const updateNote = (curr_note)=>{
    ref.current.click()
    setNote({etitle: curr_note.title,edescription: curr_note.description,etag: curr_note.tag})
  }
  const handleOnChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
const handleClick = (e)=>{
    e.preventDefault()
    console.log("updating the note",note);
}
  return (
    <>
      <AddNote />

      <button style={{display:"none"}}type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={handleOnChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleOnChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="etag" name="tag" value={note.etag} onChange={handleOnChange}/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem updatenote = { updateNote }note={note} key={note._id} />
        })}
      </div>
    </>
  )
}

export default Notes