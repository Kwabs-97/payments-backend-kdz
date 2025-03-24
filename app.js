import env from 'dotenv'
env.config()
import { MongoClient } from "mongodb";
import { uri } from "./atlas_uri.js";
console.log(uri)