import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
    let host = "http://localhost:3000"
    const notesInitial = []
    const [notes,setNotes] = useState(notesInitial)
    const getNotes = async ()=>{
      // API Call
      const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MDAwYzM2NjY2YTA5ZjA0YmZjYjAwIn0sImlhdCI6MTcwNDEwMjk1MSwiZXhwIjoxNzA0Mjc1NzUxfQ.gYhJE8clEqeAzwjqXqDEOSmQU7JZhA6GFd9ulzYeznk"
        }
      })
      let json = await response.json()
      console.log(json)
      setNotes(json)
    }

      // 1. Add a note
      
      const addNote = async (title,description,tag)=>{
        // API Call
        const response = await fetch(`${host}/api/notes/addnote`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MDAwYzM2NjY2YTA5ZjA0YmZjYjAwIn0sImlhdCI6MTcwNDEwMjk1MSwiZXhwIjoxNzA0Mjc1NzUxfQ.gYhJE8clEqeAzwjqXqDEOSmQU7JZhA6GFd9ulzYeznk"
          },
          body: JSON.stringify({title,description,tag})
        })
        let json = await response.json();
        console.log(json)
        let note = {
          "_id": "65728c7532a9b60211a27f7c",
          "user": "657000c36666a09f04bfcb00",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2023-12-08T03:24:37.333Z",
          "__v": 0
        };
          setNotes(notes.concat(note));
      }
      // 2. Edit a note
      const editNote = async(id,title,description,tag)=>{
        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MDAwYzM2NjY2YTA5ZjA0YmZjYjAwIn0sImlhdCI6MTcwNDEwMjk1MSwiZXhwIjoxNzA0Mjc1NzUxfQ.gYhJE8clEqeAzwjqXqDEOSmQU7JZhA6GFd9ulzYeznk"
          },
          body: JSON.stringify({title,description,tag})
        })
        const json = await response.json()
        console.log(json)
        let i;
        let newNotes = JSON.parse(JSON.stringify(notes))
        for(i=0;i<notes.length;i++)
        {
          const element = notes[i];

          if(element._id===id)
          {
            newNotes[i].title = title;
            newNotes[i].description = description;
            newNotes[i].tag = tag;
            break;
          }
        }
        setNotes(newNotes);
      }

      // 3. Delete a note
      const deleteNote = async(id)=>{
        // API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3MDAwYzM2NjY2YTA5ZjA0YmZjYjAwIn0sImlhdCI6MTcwNDEwMjk1MSwiZXhwIjoxNzA0Mjc1NzUxfQ.gYhJE8clEqeAzwjqXqDEOSmQU7JZhA6GFd9ulzYeznk"
          }
        })
        const json = response.json();
        console.log(json);
        console.log("Deleting a note with id "+id)
        let newNote = notes.filter((note)=>{
          return note._id !== id
        })
        setNotes(newNote);
      }

    return(
    <NoteContext.Provider value={{notes,addNote,editNote,deleteNote,getNotes}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;