import mongoose, { model } from "mongoose";
import { plansSchema, subscriptionSchema } from "../schemas";

const Susbscription = mongoose.model("Subscription", subscriptionSchema);
const Plans = mongoose.model("Plans", plansSchema);
