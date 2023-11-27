import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://admin:oceanflux@project.l7yrx7s.mongodb.net/");
        console.log(">>> DB is connected");
    }catch(error){
        console.log(error);
    }
};