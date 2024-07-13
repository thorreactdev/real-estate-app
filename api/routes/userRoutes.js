import express from "express";
import { updateUser , deleteUser, getUserListing, getUser, subscribedUser} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id" ,verifyToken, updateUser);
router.delete("/delete/:id" ,verifyToken, deleteUser);
router.get("/listing/:id" , verifyToken , getUserListing);
router.get("/:id" , verifyToken , getUser);
router.post("/subscribe" , verifyToken , subscribedUser);


export default router;