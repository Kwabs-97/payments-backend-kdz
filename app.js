import dbConnect from "./config/mongoose.js";
import { insertData, getSubscriptions } from "./model/index2.js";
async function main() {
  await dbConnect();
  // await insertData();
  const subscriptions = await getSubscriptions();
  console.log(subscriptions["0"].plan_id.price);
}

await main();

/*
insights here, subscriptions.plain.id is of type Object.ID,
JSON API's like REST or GRAPHQL, doesn't support Object.ID since it is 
a mongoDB specific type.
If you wish to send subscriptions over a JSON API, convert the entire subscription to json object using the .lean() method and then convert plain id to string using the toString() method

*/
