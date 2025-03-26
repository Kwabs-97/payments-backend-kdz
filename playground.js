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
  await Plan.deleteMany({});
  await Subscription.deleteMany({});

  console.log("inserting plans data --- start");
  const plans = await Plan.insertMany(plansData);
  return plans;
};

const subscriptions = [];

async function generateSubs(plans) {
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

  return subscriptions;
}

const plans = await insertPlans();
const subs = await generateSubs(plans);



const getSubs = async () => {
  try {
    const subs = await Subscription.find().populate("plan_id");
    return subs;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return [];
  }
};

const subsData = await getSubs();
console.log(`Total subscriptions in database: ${subsData.length}`);
