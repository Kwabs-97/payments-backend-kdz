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
