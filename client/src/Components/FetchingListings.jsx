import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import ListingItem from "./ListingItem";


export default function FetchingListings() {
    const[offerListing , setOfferListing] = useState([]);
    const[saleListing , setSaleListing] = useState([]);
    const[rentListing , setRentListing] = useState([]);
    const[rentSale, setRentSale] = useState([]);

    useEffect(()=>{
        const fetchOfferListing = async()=>{
            try {
                const res = await fetch(`/api/listing/search?offer=true&limit=6`);
                const data = await res.json();
                console.log(data);
                setOfferListing(data);
                fetchSaleListing();
            } catch (error) {
                console.log(error);
            }
        }


        const fetchSaleListing = async()=>{
            try {
                const res = await fetch("/api/listing/search?type=sale&limit=5");
                const data = await res.json();
                console.log(data);
                setSaleListing(data);
                fetchRentListing();
            } catch (error) {
                console.log(error);
            }
        }

        const fetchRentListing = async()=>{
            try {
                const res = await fetch("/api/listing/search?type=rent&limit=4");
                const data = await res.json();
                console.log(data);
                setRentListing(data);
                fetchRentAndSale();
            } catch (error) {
                console.log(error);
            }
        }

        const fetchRentAndSale = async()=>{
            try{
                const res= await fetch("/api/listing/search?type=all&limit=6");
                const data = await res.json();
                console.log(data);
                setRentSale(data);
            }catch(error){
                console.log(error);
            }
        }

        fetchOfferListing();
    },[]);


  return (
    <div className='max-w-[1100px] mx-auto p-3 flex flex-col gap-8 my-10 '>
        {offerListing && offerListing.length > 0 && (
            <div>
                <div className="my-3">
                    <h2 className='text-2xl font-semibold text-slate-600'>Recent Offer Property</h2>
                    <Link className="text-sm text-blue-800 hover:underline uppercase" to={`/search?offer=true`}>show more offers</Link>
                </div>
                <div className="flex flex-wrap gap-6">
                    {offerListing.map((listItem)=>(
                        <ListingItem key={listItem?._id} listing={listItem} />

                    ))}
                </div>
            </div>
        )}
        {saleListing && saleListing.length > 0 && (
            <div>
                <div className="my-3">
                    <h2 className='text-2xl font-semibold text-slate-600'>Recent Sale Property</h2>
                    <Link className="text-sm text-blue-800 hover:underline uppercase" to={`/search?type=sale`}>show more sale</Link>
                </div>
                <div className="flex flex-wrap gap-6">
                    {saleListing.map((listItem)=>(
                        <ListingItem key={listItem?._id} listing={listItem} />

                    ))}
                </div>
            </div>
        )}
        {rentListing && rentListing.length > 0 && (
            <div>
                <div className="my-3">
                    <h2 className='text-2xl font-semibold text-slate-600'>Recent Rent Property</h2>
                    <Link className="text-sm text-blue-800 hover:underline uppercase" to={`/search?type=rent`}>show more rent</Link>
                </div>
                <div className="flex flex-wrap gap-6">
                    {rentListing.map((listItem)=>(
                        <ListingItem key={listItem?._id} listing={listItem} />
                    ))}
                </div>
            </div>
        )}
        {rentSale && rentSale.length > 0 && (
            <div>
                <div className="my-3">
                    <h2 className='text-2xl font-semibold text-slate-600'>Both Rent And Sale Property</h2>
                    <Link className="text-sm text-blue-800 hover:underline uppercase" to={`/search?type=rent`}>show more rent</Link>
                </div>
                <div className="flex flex-wrap gap-6">
                    {rentSale.map((listItem)=>(
                        <ListingItem key={listItem?._id} listing={listItem} />
                    ))}
                </div>
            </div>
        )}
    </div>
  )
}
