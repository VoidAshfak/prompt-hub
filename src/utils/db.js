
import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {    

    if(isConnected) {
        console.log('MongoDB is already connected');
        return;
    } 

    try {
        const db = await mongoose.connect(process.env.DB_CONNECTION_STRING, {
            dbName: 'prompthub',
        });
        console.log('MongoDB connected', db.connection.name);    
        isConnected = true;
    } catch (error) {
        console.log('Error connecting to MongoDB', error);
    }
}