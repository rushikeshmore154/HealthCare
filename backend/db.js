import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

export const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to mongodb");
    }catch(err){
        console.log(err)
        console.log("unable to connect to database");
    }
}

