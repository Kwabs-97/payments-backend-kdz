import mongoose, { model } from "mongoose";
import { plansSchema, subscriptionSchema } from "./index.js";

const Subscription = mongoose.model("Subscription", subscriptionSchema);
const Plans = mongoose.model("Plans", plansSchema);
export { Plans, Subscription };
