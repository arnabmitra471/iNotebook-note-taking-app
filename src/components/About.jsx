import React ,{useContext, useEffect} from 'react'
import NoteContext from '../context/notes/NoteContext'

const About = () => {
  const a = useContext(NoteContext);
  useEffect(()=>{
    a.update();
  },[a])
  return (
    <div>This is About {a.info.name} and he is in class {a.info.class}</div>
  )
}

export default About