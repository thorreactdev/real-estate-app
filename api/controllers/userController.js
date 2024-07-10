import Listing from "../models/listingModel.js";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/erroMessage.js";
import bycryptjs from "bcryptjs";

export const updateUser = async(req,res, next) =>{
    if(req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account"));
    try {
        if(req.body.password){
            req.body.password = bycryptjs.hashSync(req.body.password , 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id , {
            $set : {
                username : req.body.username,
                email : req.body.email,
                password : req.body.password,
                avatar : req.body.avatar
            }
        },{ new : true});
        

        const { password , ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async(req,res,next) =>{
    if(req.user.id !== req.params.id) return next(errorHandler(401, "You can only delete your own account"));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token").status(200).json("User Has Been Deleted");
    } catch (error) {
        next(error);
    }

}

export const getUserListing = async(req,res,next) =>{
    if(req.user.id !== req.params.id) return next(errorHandler(401, "You can only view your own listing"));
    try {
        const listingData = await Listing.find({ userRef : req.params.id});
        console.log(listingData);
        res.status(200).json(listingData);
    } catch (error) {
        next(error);
    }
}


