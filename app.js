import env from 'dotenv'
env.config()
import { MongoClient } from "mongodb";
import { uri } from "./atlas_uri.js";

const client = new MongoClient(uri);

const connetcDB = async () => {
    try {
        await client.connect();
        console.log("successfully connnect to the database")
    } catch (error) {
        console.log("error connection to database")
    }
}