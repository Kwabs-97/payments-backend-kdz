import { v4 as uuidv4 } from "uuid";
import { Subscription, Plan } from "../schemas/index.js";
import { plansData, subscriptionCounts } from "../data/index.js";

const clearDatabase = async () => {
  console.log("Clearing database...");
  await Plan.deleteMany({});
  await Subscription.deleteMany({});
  console.log("Database cleared.");
};

const insertPlans = async () => {
  try {
    console.log("Inserting plans data...");
    const plans = await Plan.insertMany(plansData);
    console.log("Plans inserted.");
    return plans;
  } catch (error) {
    console.error("Error inserting plans:", error);
    return [];
  }
};

const generateSubscriptionsData = (plans) => {
  console.log("Generating subscription data...");
  const subscriptions = [];

  for (const plan of plans) {
    const count = subscriptionCounts[plan.name] || 0;
    for (let i = 0; i < count; i++) {
      subscriptions.push({
        business_id: uuidv4(),
        email: `unique_business_${i}@example.com`,
        plan_id: plan._id,
        payment_platform: {
          token: uuidv4(),
          external_id: uuidv4(),
          name: Math.random() > 0.5 ? "Stripe" : "Paypal",
        },
      });
    }
  }

  console.log(`Generated ${subscriptions.length} subscriptions.`);
  return subscriptions;
};

const insertSubscriptions = async (subscriptions) => {
  if (subscriptions.length === 0) {
    console.log("No subscriptions to insert.");
    return;
  }

  try {
    console.log("Inserting subscription data...");
    await Subscription.insertMany(subscriptions);
    console.log("Subscriptions inserted.");
  } catch (error) {
    console.error("Error inserting subscriptions:", error);
  }
};

const insertData = async () => {
  await clearDatabase();

  const plans = await insertPlans();
  if (plans.length === 0) return;

  const subscriptions = generateSubscriptionsData(plans);
  await insertSubscriptions(subscriptions);
};

export { insertData };
