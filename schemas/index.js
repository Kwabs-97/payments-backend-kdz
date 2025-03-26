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
    required:true,
    unique:true,
  },

  email: { type: String, required:true, unique: true },
  plan_id: { type: mongoose.Types.ObjectId, required:true, ref: 'Plan' },
  payment_platform: {
    token: {
      type: String,
      required:true
    },
    external_id: { type: String, required:true },
    name: { type: String, required:true, enum: ['Paypal', 'Stripe'] }
  },
});

const Plan = new mongoose.model('Plan', plansSchema);
const Subscription = new mongoose.model('Subscription', subscriptionSchema)

export {Plan, Subscription}