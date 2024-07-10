import express from "express";
import { createListing, deleteUserListing, getListing, updateListing } from "../controllers/listingController.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post("/create" ,verifyToken, createListing);
router.delete("/delete/:id" , verifyToken , deleteUserListing);
// router.post("update/:id" , verifyToken , updateListing);
router.post("/update/:id" , verifyToken , updateListing);
router.get("/get/:id" , getListing);


export default router;