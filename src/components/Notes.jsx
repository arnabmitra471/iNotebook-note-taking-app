import React, { useContext } from 'react'

import NoteItem from './NoteItem'
import AddNote from './AddNote'
import NoteContext from '../context/notes/NoteContext'
const Notes = () => {
  const noteContext = useContext(NoteContext)
  const {notes} = noteContext;
  return (
    <>
      <AddNote />
      <div className='row my-3'>
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem note={note} key={note._id} />
        })}
      </div>
    </>
  )
}

export default Notes