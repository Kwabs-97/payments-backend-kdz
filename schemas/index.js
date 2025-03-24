import mongoose from "mongoose";
const plansSchema = new mongoose.Schema({
  name: "String",
  price: "Number",
  period: "String",
  status: "A" | "D",
  features: {
    videos: boolean,
    audio: boolean,
    download: boolean,
    streaming: boolean,
    customize: boolean,
  },
});

export {plansSchema}