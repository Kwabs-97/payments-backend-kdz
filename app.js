import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
const uri =
  "mongodb+srv://thisissamuelyeboah:KhobeWayne@kwabscluster.d7jjk.mongodb.net/?retryWrites=true&w=majority&appName=KwabsCluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("subs").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


// connect to mongo with mongoose
const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://thisissamuelyeboah:KhobeWayne@kwabscluster.d7jjk.mongodb.net/", { dbName: 'subs' })
    console.log("connection to subs database success from mongoose")
  } catch (error) {
    throw error("Error connecting to your database", error)
  }
}

connect()