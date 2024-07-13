import { FaSearch } from "react-icons/fa";
import { Link , useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export default function Header() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state)=> state.user);
  const[searchTerm ,setSearchTerm] = useState("");
  const handleSubmit = (e) =>{
    e.preventDefault();
    const urlParam = new URLSearchParams(window.location.search);
    urlParam.set("searchTerm", searchTerm);
    const searchTermFromUrl = urlParam.toString();
    navigate(`/search?${searchTermFromUrl}`);
  };

  useEffect(() =>{
    const urlParam = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParam.get("searchTerm");
    console.log(searchTermFromUrl);
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    }
  },[window.location.search]);


  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
        <h1 className="font-bold text-sm sm:text-2xl flex flex-wrap gap-1">
          <span className="text-slate-500">Vinay</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        </Link>
        <form onSubmit={handleSubmit} className="bg-slate-100 p-2 rounded-lg flex items-center">
          <input type="text" placeholder="Search..." className="bg-transparent outline-none w-24 sm:w-64"  onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}/>
          <button type="submit">
          <FaSearch className="text-slate-600"/>
          </button>
        </form>
        <ul className="flex gap-6 items-center">
          <Link to="/">
          <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">Home</li>
          </Link>
          <Link to="/about">
          <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">About</li>
          </Link>
          <Link to="/profile">
          {
            currentUser ? (
              <figure>
                <img className="rounded-full object-cover w-10 h-10" src={currentUser.avatar} alt="profile_photo"/>
              </figure>
            ):(
              <li className="text-slate-700 hover:underline cursor-pointer">Sign in</li>
            )
          }
          </Link>
        </ul>
      </div>
    </header>
  );
}
