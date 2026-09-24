import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DATABASE_NAME,
    });
    console.log("Connected to Database Sucessfully.");
  } catch (error) {
    console.log("Failed While Connecting to Database.", error);
    throw error;
  }
};

export default connectDb;
