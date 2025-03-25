import { v4 as uuidv4 } from "uuid";
import { plansData } from "../data/plans.data";
import { Subscription, Plan } from "../schemas";

// clear database records for plans and subscriptions
const clearData = async () => {
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
