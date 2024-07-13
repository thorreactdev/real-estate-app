import { Link } from "react-router-dom";
import Popup from "./Popup";
import { useState } from "react";

export default function Hero() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="flex max-w-7xl mx-auto items-center ">
      <div className="flex flex-col p-28 px-3 pl-6 gap-6 flex-1">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find our next <span className="text-slate-500">perfect </span>
          <br /> place with ease
        </h1>
        <div className="text-gray-500 text-xs sm:text-lg">
          Vinay Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <div className="flex gap-4 flex-wrap">
        <Link to={"/search"} className="text-xs sm:text-sm font-bold border bg-red-800 text-white rounded-lg p-3 w-full max-w-[120px] text-center uppercase hover:bg-red-900 hover:opacity-95 hover:shadow-sm transition duration-300">
          Let{"'"}s Start
        </Link>
        <Link  onClick={handleClickOpen} className="text-xs sm:text-sm font-bold border bg-green-800 text-white rounded-lg p-3 w-full max-w-[130px] uppercase text-center hover:bg-green-900 hover:opacity-95 hover:shadow-sm transition duration-300" >
          subscribe
        </Link>

        </div>
      </div>
      <div className="hidden sm:inline flex-1 cursor-pointer">
      <iframe src="https://lottie.host/embed/8a4dffe7-489f-4b82-a73f-27edb98e9c2c/6L38XRjIQz.json" loading="lazy" title="Real Estate" className="w-[300px] sm:w-[340px] md:w-[350px] lg:w-[450px] h-[400px] sm:h-[340px] md:h-[350px] lg:h-[450px] ml-24"></iframe>
      </div>
      <Popup open={open} handleClose={handleClose} />
    </div>
  );
}
