import dbConnect from "./config/mongoose.js";
import { getSubs } from "./model/playground.js";
// dbConnect()
async function main() {
    await dbConnect();
    const subscriptions = await getSubs();
    const filtered = subscriptions.filter((subscription) => {
        return subscription.plan_id.price >= 50
    })

    console.log(filtered)


}

main();

/*
insights here, subscriptions.plain.id is of type Object.ID,
JSON API's like REST or GRAPHQL, doesn't support Object.ID since it is 
a mongoDB specific type.
If you wish to send subscriptions over a JSON API, convert the entire subscription to json object using the .lean() method and then convert plain id to string using the toString() method

*/
