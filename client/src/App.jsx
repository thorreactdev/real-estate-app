import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Signin from "./Pages/Signin";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import Header from "./Components/Header";
function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>}/>
        <Route path="/sign-in" element={<Signin/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
  )
}

export default App
