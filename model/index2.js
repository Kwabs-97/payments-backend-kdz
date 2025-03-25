import { v4 as uuidv4 } from "uuid";
import { Subscription, Plan } from "../schemas";
import { plansData, subscriptionCounts } from "../data";

// clear database records for plans and subscriptions
const cleanData = async () => {
  console.log("cleaning database -- start");
  await Plan.deleteMany({});
  await Subscription.deleteMany({});
  console.log("cleaning databse -- end");
};

// insert plansData into database
const insertPlans = async () => {
  try {
    console.log("inserting plans -- start");
    const plans = await Plan.insertMany(plansData);
    console.log("inserting plans -- complete");
    return plans;
  } catch (error) {
    console.log("error inserting plans", []);
    return [];
  }
};

// Generate subscription data

const generateSubscriptionsData = (plans) => {
  console.log("generating subscription data... start");

  const subscriptions = [];
  for (const plan in plansData) {
    const count = subscriptionCounts[plan.name];
    for (let i = 0; i < count; i++) {
      subscriptions.push({
        business_id: uuidv4(),
        email: `unique_business@${i}.com`,
        plan_id: plan._id,
        payment_platform: {
          token: uuidv4(),
          external_id: uuidv4(),
          name: Math.random() > 0.5 ? "Stripe" : "Paypal",
        },
      });
    }
  }
  console.log("generating subscription data -- complete");

  return subscriptions;
};


// insert subscription data
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

  
