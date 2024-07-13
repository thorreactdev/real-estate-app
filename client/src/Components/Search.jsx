import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import Loader from "./Loader";
import errorImage from "../assets/Sandy_Tech-28_Single-11.jpg";
import ListingItem from "./ListingItem";


export default function Search() {
  const navigate = useNavigate();
  const [sidebar, setSideBar] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  const[loading , setLoading] = useState(false);
  const[listing , setListing] = useState([]);
  const[showMore , setShowMore] = useState(false);
  const[error , setError] =useState(false);

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSideBar({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
  }

  const fetchListing = async() =>{
    setLoading(true);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/search?${searchQuery}`)
    console.log(res);
    const data = await res.json();
    console.log(data);
    if(data.length === 0){
      setError(true);
      setLoading(false);
      return;
    }
    if(data.length > 8){
      setShowMore(true);
    }else{
      setShowMore(false);
    }
    setError(false);
    setListing(data);
    setLoading(false);
  }
  fetchListing();
},[location.search]);

 

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSideBar({ ...sidebar, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSideBar({ ...sidebar, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSideBar({
        ...sidebar,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.name === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      console.log(sort);
      const order = e.target.value.split('_')[1] || 'desc';
      console.log(order);
      setSideBar({ ...sidebar, sort, order });
    }
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    urlParams.set("searchTerm" , sidebar.searchTerm);
    urlParams.set("type" , sidebar.type);
    urlParams.set("parking" , sidebar.parking);
    urlParams.set("furnished" , sidebar.furnished);
    urlParams.set("offer" , sidebar.offer);
    urlParams.set("sort" , sidebar.sort);
    urlParams.set("order" , sidebar.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  const onShowMoreClick = async()=>{
    const numberOfListing = listing.length;
    const startIndex = numberOfListing;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("startIndex" , startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/search?${searchQuery}`);
    const data = await res.json();
    if(data.length < 9){
      setShowMore(false);
    }
    setListing([...listing, ...data]);
  }



  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term :
            </label>
            <input
              type="text"
              placeholder="Search"
              id="searchTerm"
              className="border p-3 rounded-lg w-full outline-none"
              value={sidebar.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="whitespace-nowrap font-semibold">Type :</label>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="all"
                className="w-4"
                onChange={handleChange}
                checked={sidebar.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="rent"
                className="w-4"
                onChange={handleChange}
                checked={sidebar.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="sale"
                className="w-4"
                onChange={handleChange}
                checked={sidebar.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="offer"
                className="w-4"
                onChange={handleChange}
                checked={sidebar.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="whitespace-nowrap font-semibold">
              Amenities:
            </label>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="parking"
                className="w-4"
                onChange={handleChange}
                checked={sidebar.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="furnished"
                className="w-4"
                onChange={handleChange}
                checked={sidebar.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label className="whitespace-nowrap font-semibold">Sort :</label>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Select Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="sort_order"
                defaultValue={"created_at_desc"}
                label="Select Sort"
                onChange={handleChange}
                 name="sort_order"
                sx={{ width: "250px" }}
              >
                <MenuItem value="regularPrice_desc">Price High To Low</MenuItem>
                <MenuItem value="regularPrice_asc">Price Low To High</MenuItem>
                <MenuItem value="createdAt_desc">Latest</MenuItem>
                <MenuItem value="createdAt_asc">Oldest</MenuItem>
              </Select>
            </FormControl>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold p-3 mt-5 text-center">Listing Result</h1>
        <div className="flex flex-wrap gap-4 p-7 w-full items-center md:items-start justify-center md:justify-start">
          {loading && (
            <Loader/>
          )}
          {error && (
            <div className="flex items-center justify-center flex-col w-full">
              <img src={errorImage} alt="error page" className="w-[300px] h-[300px] mix-blend-darken self-center"/>
              <h1 className="text-2xl font-semibold p-3 mt-5">Sorry No Listing Found</h1>
            </div>
          )}
          {
            !loading && !error && listing && listing.map((item)=>(
              <ListingItem key={item._id} listing={item}/>
            ))
          }
          {
            showMore && (
                <button onClick={onShowMoreClick} className="w-full uppercase mt-3 text-green-700 font-medium p-3 rounded-lg hover:underline">show more</button>
            )
          }
          </div>
      </div>
    </div>
  
  );
}
