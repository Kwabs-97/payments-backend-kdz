import mongoose from "mongoose";
// connect to mongo with mongoose
const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://thisissamuelyeboah:KhobeWayne@kwabscluster.d7jjk.mongodb.net/",
      { dbName: "subs" }
    );
    console.log("connection to subs database success from mongoose");
  } catch (error) {
    throw error("Error connecting to your database", error);
  }
};

export default connect;
