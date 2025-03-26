import { plansData } from "./data/index.js";
import { v4 as uuidv4 } from "uuid";
import { Subscription, Plan } from "./schemas/index.js";
import dbConnect from "./config/mongoose.js";

await dbConnect();
const subscriptionCounts = {
  Freemium: 500,
  Bronze: 7000,
  Silver: 12000,
  Gold: 8000,
  Platinum: 5000,
};

const insertPlans = async () => {
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

async function generateSubs(plans) {
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
}

const dbPlans = await insertPlans();
const generatedSubs = await generateSubs(dbPlans);

const insertSubs = async (subscriptions) => {
  if (!subscriptions) {
    return null;
  }
  try {
    console.log("inserting subscriptions into db -- start");
    const subs = Subscription.insertMany(subscriptions);
    console.log("inserting subscription into db-- complete");
    return subs;
  } catch (error) {}
  console.log("error inserting generated subscriptions into db", error);
};

const dbSubscriptions = await insertSubs(generatedSubs);
console.log("inserted subscriptions", dbSubscriptions);

const getSubs = async () => {
  try {
    const subs = await Subscription.find().populate("plan_id");
    return subs;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return [];
  }
};

export const populatedSubs = await getSubs();
