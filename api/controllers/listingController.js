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