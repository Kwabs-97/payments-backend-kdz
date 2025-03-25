import mongoose, { model } from "mongoose";
import { plansSchema, subscriptionSchema } from ".";

const Susbscription = mongoose.model("Subscription", subscriptionSchema);
const Plans = mongoose.model("Plans", plansSchema);
export { Plans, Susbscription }