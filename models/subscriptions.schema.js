import mongoose from "mongoose";
const subscriptionSchema = new mongoose.Schema({
  business_id: "String",
  email: "String",
  plan_id: "String",
  payment_platform: {
    token: "String",
    external_id: "String",
    name: "Stripe" | "Paypal",
  },
});
