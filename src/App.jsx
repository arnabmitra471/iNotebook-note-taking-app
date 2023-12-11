import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Navbar from "./components/Navbar"
import About from "./components/About"
import Home from "./components/Home"
function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <h1>This is iNotebook</h1>
      <Routes>
      <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/about" element={<About/>}></Route>
      </Routes>
      </Router>
    </>
  )
}

export default App
