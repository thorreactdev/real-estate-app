import Listing from "../models/listingModel.js";
import { errorHandler } from "../utils/erroMessage.js";

export const createListing = async(req,res,next) =>{
    try {
        const listing = await Listing.create(req.body);
        res.status(201).json(listing);
        
    } catch (error) {
        next(error);
    }
};

export const deleteUserListing = async(req,res,next) =>{
    const deletedListing = await Listing.findById(req.params.id);
   
        if(!deleteUserListing){
            return next(errorHandler(404 , "Listing not found!"))
        }
        if(req.user.id !== deletedListing.userRef){
            return next(errorHandler(401 , "You are not authorized to delete this listing!"))
        }
        console.log(deletedListing);
    try{
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("Listing deleted successfully!");
    } catch (error) {
        next(error);
    }
}

export const updateListing = async(req,res,next)=>{
    const listing = await Listing.findById(req.params.id);
    if(!listing){
        return next(errorHandler(404 , "Listing not found!"))
    }
    if(req.user.id !== listing.userRef){
        return next(errorHandler(401 , "You are not authorized to update this listing!"))
    }
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id , req.body , {new : true});
        res.status(200).json(updatedListing);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const getListing = async(req , res) =>{
    try {
        const listing = await Listing.findById(req.params.id);
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}

export const getListings = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      let offer = req.query.offer;
  
      if (offer === undefined || offer === 'false') {
        offer = { $in: [false, true] };
      }
  
      let furnished = req.query.furnished;
  
      if (furnished === undefined || furnished === 'false') {
        furnished = { $in: [false, true] };
      }
  
      let parking = req.query.parking;
  
      if (parking === undefined || parking === 'false') {
        parking = { $in: [false, true] };
      }
  
      let type = req.query.type;
  
      if (type === undefined || type === 'all') {
        type = { $in: ['sale', 'rent'] };
      }
  
      const searchTerm = req.query.searchTerm || '';
  
      const sort = req.query.sort || 'createdAt';
  
      const order = req.query.order || 'desc';
  
      const listings = await Listing.find({
        name: { $regex: searchTerm, $options: 'i' },
        offer,
        furnished,
        parking,
        type,
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
  
      return res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  };