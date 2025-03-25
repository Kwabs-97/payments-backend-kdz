import { Plans, Subscription } from "../schemas/model.js";
import { v4 as uuidv4 } from "uuid";
import connect from "../app.js";

await connect();

const insertData = async () => {
  const plansData = [
    {
      name: "Freemium",
      price: 0,
      period: "monthly",
      status: "A",
      features: {
        videos: false,
        audio: true,
        download: false,
        streaming: false,
        customize: false,
      },
    },
    {
      name: "Bronze",
      price: 30,
      period: "monthly",
      status: "A",
      features: {
        videos: true,
        audio: true,
        download: false,
        streaming: false,
        customize: false,
      },
    },
    {
      name: "Silver",
      price: 50,
      period: "monthly",
      status: "A",
      features: {
        videos: true,
        audio: true,
        download: false,
        streaming: false,
        customize: true,
      },
    },
    {
      name: "Platinum",
      price: 100,
      period: "monthly",
      status: "A",
      features: {
        videos: true,
        audio: true,
        download: true,
        streaming: true,
        customize: true,
      },
    },
  ];

  // insert plans
  const insertPlans = async () => {
    try {
      console.log("inserting plans data ---");
      const insertedData = await Plans.insertMany(plansData);
      console.log("inserting plans data --- complete");
      console.log(insertedData);
      return insertedData;
    } catch (error) {
      console.log("error inserting plans data ---", error);
    }
  };

  const subscriptions = [];
  async function genSubscriptionData() {
    const insertedPlansData = await insertPlans();
    console.log(insertedPlansData);
    //subscription data
    const subscriptionCounts = {
      Freemium: 500,
      Bronze: 7000,
      Silver: 12000,
      Gold: 8000,
      Platinum: 5000,
    };

    //generate subscription data
    console.log("generating subscription data --- start");
    for (const plan of insertedPlansData) {
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
    console.log("subscription data ---", subscriptions);
  }
  await genSubscriptionData();

  const insertSubscriptions = async () => {
    try {
      console.log("inserting subscription data --- start");
      await Subscription.insertMany(subscriptions);
      console.log("inserting subscription data --- complete");
    } catch (error) {
      console.log("error inserting subscription data", error);
    }
  };
  await insertSubscriptions();
};

await insertData();
