import { lazy, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from "swiper";
import 'swiper/css/bundle';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking ,FaShare} from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../Components/Contact";


export default function Listing() {
  SwiperCore.use([Navigation]);
  const{ id } = useParams();
  const[listing , setListing] = useState(null);
  const[loading , setLoading] = useState(false);
  const[error , setError] = useState(false);
  const[contact , setContact] = useState(false);
  const[copied, setCopied] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser);

  useEffect(()=>{
    const fetchListing = async() =>{
         try {
          setLoading(true);
          const res = await fetch(`/api/listing/get/${id}`);
          const data = await res.json();
          console.log(data);
          if(data.success === false){
            setError(true);
            setLoading(false);
            return;
          }
          setListing(data);
          setLoading(false);
         } catch (error) {
           setError(true);
           setLoading(false);
         }
    }

    fetchListing();
  },[id]);




  return (
    <main>
      {loading && <Loader/> }
      {error && 
      <div className="flex items-center justify-center flex-col ">
        <p className="text-center my-7 text-2xl text-red-700 font-semibold">Something Went Wrong!!</p>
        <Link to="/">
        <button className="text-white bg-slate-600 p-3 rounded-lg uppercase">Go To Home</button>
        </Link>
      </div>
      }
      {
        listing && !loading && !error && (
          <div className="mt-1">
            <Swiper navigation>
              {listing?.imageUrls?.map((url)=> (
                <SwiperSlide key={url}>
                  <div loading={lazy} className="h-[500px]" style={{ background : `url(${url}) center no-repeat`, backgroundSize : "cover" ,backgroundPosition : "center"}}></div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="fixed top-[13%]  right-[3%]  rounded-full z-10 w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
              <FaShare className="text-slate-500 text-lg"  
              onClick={()=>{
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
              />
            </div>
            {copied && (
              <p className="bg-slate-100 p-2 rounded-md fixed top-[23%] right-[5%] z-10">
                Link Copied
              </p>
            )}
            <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
              <p className="text-2xl font-semibold" >{listing?.name} - ${" "}
                {listing?.offer ? listing?.discountPrice.toLocaleString("en-US") : listing?.regularPrice}
                {listing?.type==="rent" && "/ month"}
              </p>
              <p className='flex items-center gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className="flex gap-2">
              <p className="bg-red-900 text-white uppercase p-2 w-full max-w-[200px] rounded-md text-center cursor-pointer hover:opacity-95">{listing?.type === "rent" ? "For rent" : "For sale"}</p>
              {listing?.offer && (
                <p className="bg-green-900 text-white uppercase p-2 rounded-md cursor-pointer hover:opacity-95 w-full max-w-[200px] text-center" >
                  ${+listing?.regularPrice - +listing?.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-600">
              <span className="font-semibold text-lg">Description :- </span>
              {listing?.description}
            </p>
            <ul className="flex items-center gap-4 sm:gap-6 text-sm font-semibold text-green-900 flex-wrap">
              <li className="flex items-center gap-1  whitespace-nowrap">
                <FaBed className='text-green-700 text-lg' />
                {listing?.bedrooms > 1 ? `${listing?.bedrooms} beds` : `${listing?.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-1  whitespace-nowrap">
                <FaBath className='text-green-700 text-lg' />
                {listing?.bathrooms > 1 ? `${listing?.bathrooms} baths` : `${listing?.bathrooms} bath`}
              </li>
              <li className="flex items-center gap-1  whitespace-nowrap">
                <FaParking className='text-green-700 text-lg' />
                {listing?.parking ? "Parking Spot" : "No Parking"}

              </li>
              <li className="flex items-center gap-1  whitespace-nowrap">
                <FaChair className='text-green-700 text-lg' />
                {listing?.furnished ? "Furnished" : "Unfurnished"}

              </li>
            </ul>
            {
              currentUser && listing.userRef !== currentUser?._id && !contact && (
                <button onClick={() => setContact(true)} className="text-white uppercase bg-slate-700 p-3 rounded-lg text-center mt-4 cursor-pointer hover:bg-opacity-95 font-semibold" >
                  contact landlord
                </button>
              )
            }
            {contact && <Contact listing={listing}/>}
            </div>
          </div>
        )
      }
    </main>
  )
}
