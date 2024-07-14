import Listing from "../models/listingModel.js";
import SubscribeSchema from "../models/subscribeModel.js";
import { sendEmail } from "../utils/emailService.js";
import { errorHandler } from "../utils/erroMessage.js";

export const createListing = async(req,res,next) =>{
    try {
        const listing = await Listing.create(req.body);
        const subscribers = await SubscribeSchema.find();
        console.log(subscribers);
        const emailContent = `
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px; font-family: Arial, sans-serif;">
                <img src="${req.body.imageUrls[0]}" alt="${req.body.name}" style="width: 100%; max-width: 600px; height: auto; border-radius: 10px; margin-bottom: 20px;">
                <h2 style="color: #333; margin-bottom: 10px;">${req.body.name}</h2>
                <p style="color: #555;">${req.body.description}</p>
                <p><strong>Address:</strong> ${req.body.address}</p>
                <p><strong>Regular Price:</strong> $${req.body.regularPrice}</p>
                ${req.body.discountPrice ? `<p><strong>Discount Price:</strong> $${req.body.discountPrice}</p>` : ''}
                <p><strong>Bathrooms:</strong> ${req.body.bathrooms}</p>
                <p><strong>Bedrooms:</strong> ${req.body.bedrooms}</p>
                <p><strong>Furnished:</strong> ${req.body.furnished ? 'Yes' : 'No'}</p>
                <p><strong>Parking:</strong> ${req.body.parking ? 'Yes' : 'No'}</p>
                <p><strong>Type:</strong> ${req.body.type}</p>
                <p><strong>Offer:</strong> ${req.body.offer ? 'Yes' : 'No'}</p>
                <div style="margin-top: 20px;">
                    <a href="https://real-estate-app-mpmk.onrender.com/" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007BFF; border-radius: 5px; text-decoration: none;">Check it out on our platform!</a>
                </div>
            </div>
        `;
        const emailPromises = subscribers.map((subscribe)=>{
            return sendEmail(
                subscribe.email,
                "New Property Uploaded",
                emailContent
            )
        });
        await Promise.all(emailPromises);
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