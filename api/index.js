import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/authRoutes.js";
dotenv.config();

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING).then(()=>{
    console.log("Connected to MongoDB");
}).catch(err =>{
    console.log(err);
});

const app = express();
app.use(express.json());

app.use("/api/auth" , authRoute);

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
