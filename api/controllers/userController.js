import Listing from "../models/listingModel.js";
import SubscribeSchema from "../models/subscribeModel.js";
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
        res.status(200).json({rest , message : "User Updated Successfully"});
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

export const getUser = async(req , res , next) =>{
    try {
        const userListing = await User.findById(req.params.id);
        console.log(userListing);
        if(!userListing) return next(errorHandler(404 , "User Not Found"));
        const { password , ...rest } = userListing._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

export const subscribedUser = async(req,res,next) =>{
    const { email , userRef } = req.body;
    if(!email || !userRef){
        return next(errorHandler(404 , "Please Enter Valid Email"))
    }
    try {
        let subscription = await SubscribeSchema.findOne({ email });
        if(subscription) return next(errorHandler(404 , "You Have Already Subscribed"));
        subscription = new SubscribeSchema({ email , userRef });
        await subscription.save();
        res.status(200).json("Subscribed Successfully");
    } catch (error) {
        console.log(error);
        next(error); 
    }
};
