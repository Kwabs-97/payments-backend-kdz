import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// connect to mongo with mongoose
const mongoUri = `mongodb+srv://thisissamuelyeboah:${process.env.DB_USER_PASSWORD}@kwabscluster.d7jjk.mongodb.net/`;
const dbConnect = async () => {
  try {
    await mongoose.connect(mongoUri, { dbName: "subs" });
    console.log("mongo db connection -- success");
  } catch (error) {
    console.log("mongo db connection -- error", error);
  }
};
export default dbConnect;
