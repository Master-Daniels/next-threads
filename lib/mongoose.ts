import mongoose from "mongoose";

let connected = false;

export const connectToDB = async () => {
    if (connected) return console.log("Already connected to mongodb instance");

    if (!process.env.MONGODB_URL) return console.log("No mongodb URL found.");

    mongoose.set("strictQuery", true);

    try {
        await mongoose.connect(process.env.MONGODB_URL!);
        connected = true;
        console.log("Connected to Mongodb");
    } catch (error: any) {
        console.log(error, error.message);
    }
};
