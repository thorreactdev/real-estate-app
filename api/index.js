import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING).then(()=>{
    console.log("Connected to MongoDB");
}).catch(err =>{
    console.log(err);
});

const app = express();

app.listen(3000, ()=>{
    console.log("Server is running on port 3000!!!");
});
