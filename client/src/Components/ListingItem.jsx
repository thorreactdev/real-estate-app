import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link className="shadow-md" to={`/listing/${listing?._id}`}>
        <img
          src={listing?.imageUrls[0] ||  'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'}
          alt="property_image"
          className="h-[300px] sm:h-[220px] object-cover w-full  hover:scale-105 transition-scale duration-300 overflow-hidden"
        />
        <div className="p-3 flex flex-col gap-3 w-full">
          <p className="truncate text-base font-semibold text-slate-700 mt-2">
            {listing?.name}
          </p>
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-green-700" />
            <p className="text-sm text-gray-600 truncate">{listing?.address}</p>
          </div>
          <div>
            <p className="line-clamp-2 text-sm">{listing?.description}</p>
          </div>
          {/* <button className="bg-green-700 text-white uppercase text-sm rounded-lg p-1 w-[100px] mt-1">{listing?.type === "sale" ?  "For Sale" : "For Rent"}</button> */}

          <div>
            <p className="text-slate-500 font-semibold mt-2">
              $
              {listing?.offer
                ? `${listing?.discountPrice.toLocaleString("en-US")}`
                : `${listing?.regularPrice.toLocaleString("en-US")}`} 
                {" "}
              {listing?.type === "rent" && "/month"}
            </p>
          </div>
          <div className="flex gap-3">
            <p className="text-slate-700 font-semibold text-xs">{listing?.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}</p>
            <p className="text-slate-700 font-semibold text-xs">{listing?.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
