import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{
    const s1 = {
        "name": "Arnab",
        "class": "11A"
    }
    const [info,setInfo] = useState(s1)
    const update = ()=>{
        setTimeout(()=>{
            setInfo({
                "name": "Shubham",
                "class": "11C"
            })
        },5000)
    }
    return(
    <NoteContext.Provider value={{info,update}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;