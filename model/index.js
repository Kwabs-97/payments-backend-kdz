import { v4 as uuidv4 } from "uuid";
import { plansData } from "../data/plans.data.js";
import { Plan, Subscription } from "../schemas/index.js";

const insertData = async () => {
  // insert plans
  const insertPlans = async () => {
    console.log("clear database -- start");
    await Plan.deleteMany({});
    await Subscription.deleteMany({});
    console.log("clear database -- complete");
    try {
      console.log("inserting plans data --- start");
      const plans = await Plan.insertMany(plansData);
      console.log("inserting plans data --- complete");
      return plans;
    } catch (error) {
      console.log("error inserting plans data ---", error);
    }
  };

  const genSubscriptionsData = (plans) => {
    //subscription data
    const subscriptionCounts = {
      Freemium: 500,
      Bronze: 7000,
      Silver: 12000,
      Gold: 8000,
      Platinum: 5000,
    };

    const subscriptions = [];

    //generate subscription data
    console.log("generating subscription data --- start");
    for (const plan of plans) {
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
    console.log("generating subscription data --- complete");
    return subscriptions;
  };

  const insertSubscriptions = async (subscriptions) => {
    try {
      console.log("inserting subscription data --- start");
      await Subscription.insertMany(subscriptions);
      console.log("inserting subscription data --- complete");
    } catch (error) {
      console.log("error inserting subscription data", error);
    }
  };
  const plans = await insertPlans();
  const subscriptions = genSubscriptionsData(plans);
  await insertSubscriptions(subscriptions);
};

export default insertData;
