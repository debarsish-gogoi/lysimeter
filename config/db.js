import mongoose from 'mongoose';
mongoose.set("strictQuery", false);
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECT);
    if (conn)
      console.log(`MongoDB Connected:${mongoose.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
