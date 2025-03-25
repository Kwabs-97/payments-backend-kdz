import mongoose from "mongoose";

const plansSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  period: { type: String, required: true },
  status: { type: String, enum: ["A", "D"], required: true },
  features: {
    videos: { type: Boolean, required: true },
    audio: { type: Boolean, required: true },
    download: { type: Boolean, required: true },
    streaming: { type: Boolean, required: true },
    customize: { type: Boolean, required: true },
  },
});

const subscriptionSchema = new mongoose.Schema({
  business_id: {
    type: String,
    required,
    unique,
  },

  email: { type: String, required, unique },
  plan_id: { type: mongoose.Types.ObjectId, required, ref: "Plans" },
  payment_platform: {
    token: {
      type: String,
      required,
    },
    external_id: { type: String, required },
    name: { type: String, required, enum: ["Paypal", "Stripe"] },
  },
});

export { plansSchema, subscriptionSchema };
