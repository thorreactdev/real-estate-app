import dotenv from "dotenv";
import express from "express";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import listRoute from "./routes/listingRoute.js";
import cookieParser from "cookie-parser";
dotenv.config();

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING).then(()=>{
    console.log("Connected to MongoDB");
}).catch(err =>{
    console.log(err);
});

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser())

app.use("/api/auth" , authRoute);
app.use("/api/user" , userRoute);
app.use("/api/listing" , listRoute);

app.use((err, req, res , next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success : false ,
        message,
        statusCode
    })
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000!!!");
});
