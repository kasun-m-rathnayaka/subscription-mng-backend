import mongoose from "mongoose";
import {DB_URI} from "../config/env.js";

if(!DB_URI){
    throw new Error('Please define the DB_URI in the .env file');
}

const connectToDatabase = async ()=>{
    try {
        await mongoose.connect(DB_URI);
        console.log('Connected to the database');
    } catch (error) {
        console.log('Error connecting to the database',error.message);
        process.exit(1)
    }
}

export default connectToDatabase