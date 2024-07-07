import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
        <h1 className="font-bold text-sm sm:text-2xl flex flex-wrap gap-1">
          <span className="text-slate-500">Vinay</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        </Link>
        <form className="bg-slate-100 p-2 rounded-lg flex items-center">
          <input type="text" placeholder="Search..." className="bg-transparent outline-none w-24 sm:w-64" />
          <FaSearch className="text-slate-600"/>
        </form>
        <ul className="flex gap-6 items-center">
          <Link to="/">
          <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">Home</li>
          </Link>
          <Link to="/about">
          <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">About</li>
          </Link>
          <Link to="/sign-in">
          <li className="text-slate-700 hover:underline cursor-pointer">Sign in</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
