import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "657277dc61ac301efb9ccb0a",
          "user": "657000c36666a09f04bfcb00",
          "title": "Attention",
          "description": "Please complete your syllabus on time to avoid last minute rush",
          "tag": "work",
          "date": "2023-12-08T01:56:44.395Z",
          "__v": 0
        },
        {
          "_id": "6572789f61ac301efb9ccb0c",
          "user": "657000c36666a09f04bfcb00",
          "title": "Youtube updated",
          "description": "Youtube video should be recorded after 3 days",
          "tag": "work",
          "date": "2023-12-08T01:59:59.623Z",
          "__v": 0
        },
        {
          "_id": "657278c661ac301efb9ccb0e",
          "user": "657000c36666a09f04bfcb00",
          "title": "LinkedIn",
          "description": "I will be active on Linkedin very soon",
          "tag": "Social",
          "date": "2023-12-08T02:00:38.983Z",
          "__v": 0
        },
        {
          "_id": "65728c7532a9b60211a27f7c",
          "user": "657000c36666a09f04bfcb00",
          "title": "Reminder",
          "description": "Complete the lab file on time",
          "tag": "Studies",
          "date": "2023-12-08T03:24:37.333Z",
          "__v": 0
        }
      ]
      const [notes,setNotes] = useState(notesInitial)
    return(
    <NoteContext.Provider value={{notes,setNotes}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;