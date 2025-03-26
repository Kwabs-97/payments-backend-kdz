import dbConnect from "./config/mongoose.js";
import { getSubs } from "./model/index.js";
// dbConnect()

export const headersArr = []
async function main() {
    await dbConnect();
    const subscriptions = await getSubs();
    const filtered = subscriptions.filter((subscription) => {
        return subscription.plan_id.price >= 50
    })

    // filtered returned numeric keys. From the loop in model/index so we extract the values
    const data = Object.values(filtered);

    const headers = data.map((da) => {
        const headers = { business_id: da.business_id, email: da.email, plane_name: da.plan_id.name, plan_price: da.plan_id.price, payment_platform_name: da.payment_platform.name }
        return headers
    });
    headersArr.push(headers)
}
await main();


/*
insights here, subscriptions.plain.id is of type Object.ID,
JSON API's like REST or GRAPHQL, doesn't support Object.ID since it is 
a mongoDB specific type.
If you wish to send subscriptions over a JSON API, convert the entire subscription to json object using the .lean() method and then convert plain id to string using the toString() method

*/
