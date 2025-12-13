import mongoose from "mongoose";

export async function dbConnected(){
    try {
        await mongoose.connect(process.env.url)
        console.log("db connected");
        
    } catch (error){
        console.log("db not connected",error);
        
    }
}