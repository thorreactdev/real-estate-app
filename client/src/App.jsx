import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Signin from "./Pages/Signin";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import Header from "./Components/Header";
import PrivateRoute from "./Components/PrivateRoute";
import CreateListing from "./Pages/CreateListing";
import Listing from "./Pages/Listing";
import UpdateListing from "./Components/UpdateListing";
import Search from "./Components/Search";
import Popup from "./Components/Popup";
// import Footer from "./Components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing/>}/>
          <Route path="/update-listing/:id" element={<UpdateListing/>}/>
        </Route>
        <Route path="/listing/:id" element={<Listing/>}></Route>
        <Route path="/search" element={<Search/>}/>
        <Route path="/popup" element={<Popup/>}/>
      </Routes>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
