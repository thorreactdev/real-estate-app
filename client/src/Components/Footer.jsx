import { Divider } from "@mui/material";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMail } from "react-icons/io5";

export default function Footer() {
  const email = "prajapativinay140404@gmail.com"
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
  return (

    <div className="shadow-md bg-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between pt-10 pb-5 flex-col md:flex-row gap-5 md:gap-0">
          <div>
            <h1 className="font-bold text-xl sm:text-2xl flex flex-wrap gap-1">
              <span className="text-slate-500">Vinay</span>
              <span className="text-slate-700">Estate</span>
            </h1>
          </div>
          <div>
            <ul className="flex flex-col md:flex-row gap-6 text-base cursor-pointer text-slate-500">
            <Link to="/">
              <li className="hover:text-slate-700 transition-all duration-300">
                Home
              </li>
            </Link>
              <li className="hover:text-slate-700 hover:font-medium transition-all duration-300">
                Offer Property
              </li>
              <li className="hover:text-slate-700 hover:font-medium transition-all duration-300">
                Rent Property
              </li>
              <li className="hover:text-slate-700 hover:font-medium transition-all duration-300">
                Sale Property
              </li>
              <li className="hover:text-slate-700 hover:font-medium transition-all duration-300">
                Rent And Sale Property
              </li>
            </ul>
          </div>
          <div>
            <Link to="/sign-in">
            <button className="bg-slate-700 text-white uppercase p-2 rounded-lg w-[100px] text-sm">
              sign in
            </button>
            </Link>
          </div>
        </div>
        <Divider />

        <div className="mt-5 flex flex-col gap-3 md:gap-0 md:flex-row justify-between">
          <div className="flex flex-col gap-7 text-slate-500">
            <div>
              <p className="text-slate-500 font-semibold text-xl">
                3015 Grand Ave
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <FaLocationDot className="text-green-700" />
                <p>3015 Grand Ave, Miami FL</p>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-green-700" />
                <p>8.00 am to 9.00 pm</p>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-green-700" />
                <p>+91 9324-751-785</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-7 text-slate-500">
            <div>
              <p className="text-slate-500 font-semibold text-xl">
                3015 Grand Ave
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <FaLocationDot className="text-green-700" />
                <p>3015 Grand Ave, Miami FL</p>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-green-700" />
                <p>8.00 am to 9.00 pm</p>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-green-700" />
                <p>+91 9324-751-785</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-7 text-slate-500">
            <div>
              <p className="text-slate-500 font-semibold text-xl">
                3015 Grand Ave
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <FaLocationDot className="text-green-700" />
                <p>3015 Grand Ave, Miami FL</p>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-green-700" />
                <p>8.00 am to 9.00 pm</p>
              </div>
              <div className="flex items-center gap-2">
                <IoMail className="text-green-700" />
                <Link to={gmailLink} target="_blank" >prajapativinay140404@gmail.com</Link>
              </div>
            </div>
          </div>
        </div>
        <Divider sx={{ paddingTop: "10px", paddingBottom: "10px" }} />

        <div className="flex justify-between pt-5 pb-5">
          <div>
            <p className="text-slate-600 font-semibold">
              &#169; Copyright All Rights Reserved {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex gap-4 text-xl">
            <Link>
              <FaFacebook className="text-green-700" />
            </Link>
            <Link>
              <RiInstagramFill className="text-green-700" />
            </Link>
            <Link>
              <FaLinkedin className="text-green-700" />
            </Link>
            <Link>
              <FaGithub className="text-green-700" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
