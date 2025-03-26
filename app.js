import dbConnect from "./config/mongoose.js";
import { getSubs } from "./model/index.js";
import genCSV from "./utils/gen_csv.js";
// dbConnect()

export const recordsArr = []
async function main() {
    await dbConnect();
    const subscriptions = await getSubs();
    const filteredSubscriptioins = subscriptions.filter((subscription) => {
        return subscription.plan_id.price >= 50
    })

    // filteredSubscriptioins returned numeric keys. From the loop in model/index so we extract the values
    const data = Object.values(filteredSubscriptioins);

    const filteredFields = data.map((da) => {
        const filteredFields = { business_id: da.business_id, email: da.email, plan_id: da.plan_id._id, plan_name: da.plan_id.name, plan_price: da.plan_id.price, payment_platform_name: da.payment_platform.name }
        return filteredFields
    });
    recordsArr.push(filteredFields);
    recordsArr.flat();

    const header = [
        { id: 'business_id', title: 'business_id' },
        { id: 'plan_id', title: 'plan_id' },
        { id: 'email', title: 'email' },
        { id: 'plan_name', title: 'plan_name' },
        { id: 'plan_price', title: 'plan_price' },
        { id: 'payment_platform_name', title: 'payment_platform_name' }
    ]

    await genCSV(header, recordsArr);
}
await main();




await genCSV();



/*
insights here, subscriptions.plain.id is of type Object.ID,
JSON API's like REST or GRAPHQL, doesn't support Object.ID since it is 
a mongoDB specific type.
If you wish to send subscriptions over a JSON API, convert the entire subscription to json object using the .lean() method and then convert plain id to string using the toString() method

*/
