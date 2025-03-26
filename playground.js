import { plansData, subscriptionCounts } from "./data/index.js";
import { v4 as uuidv4 } from "uuid";
import { Subscription, Plan } from "./schemas/index.js";

export const insertPlans = async () => {
  console.log("clearing db -- start");
  await Plan.deleteMany({});
  await Subscription.deleteMany({});

  console.log("clearing db -- complete");
  try {
    console.log("inserting plans into db -- start");
    const plans = await Plan.insertMany(plansData);
    console.log("inserting plans into db -- complete");
    return plans;
  } catch (error) {
    console.log("error inserting plans into db", error);
  }
};

export const generateSubs = async (plans) => {
  console.log("generating subscriptions -- start");
  const subscriptions = [];
  let emailCounter = 0;
  for (const plan of plans) {
    const count = subscriptionCounts[plan.name];
    for (let i = 0; i < count; i++) {
      subscriptions.push({
        business_id: uuidv4(),
        email: `unique_business_${emailCounter}@example.com`,
        plan_id: plan._id,
        payment_platform: {
          token: uuidv4(),
          external_id: uuidv4(),
          name: Math.random() > 0.5 ? "Stripe" : "Paypal",
        },
      });
      emailCounter++;
    }
  }
  console.log("subscriptions generation -- complete");
  return subscriptions;
};

export const insertSubs = async (subscriptions) => {
  if (!subscriptions) {
    return null;
  }
  try {
    console.log("inserting subscriptions into db -- start");
    const subs = await Subscription.insertMany(subscriptions);
    console.log("inserting subscription into db-- complete");
    return subs;
  } catch (error) {
    console.log("error inserting generated subscriptions into db", error);
  }
};

export const getSubs = async () => {
  try {
    const subs = await Subscription.find().populate("plan_id");
    console.log(subs);
    return subs;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return [];
  }
};