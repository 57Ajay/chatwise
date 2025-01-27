import { config } from "dotenv";
config();

import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const dbConnect = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`MongoDB connected to ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("Error: ",error);
        process.exit(1);
    };
};

export default dbConnect;