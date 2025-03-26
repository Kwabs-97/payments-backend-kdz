import dbConnect from "./config/mongoose.js";
import { getSubs } from "./model/index.js";
import { createObjectCsvWriter } from "csv-writer";
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
        const filteredFields = { business_id: da.business_id, email: da.email, plan_name: da.plan_id.name, plan_price: da.plan_id.price, payment_platform_name: da.payment_platform.name }
        return filteredFields
    });
    recordsArr.push(filteredFields);
    recordsArr.flat();
}
await main();


const genCSV = async () => {
    const csvWriter = createObjectCsvWriter({
        path: 'file.csv',
        header: [
            { id: 'business_id', title: 'business_id' },
            { id: 'email', title: 'email' },
            { id: 'plan_name', title: 'plan_name' },
            { id: 'plan_price', title: 'plan_price' },
            { id: 'payment_platform_name', title: 'payment_platform_name' }
        ]
    });

    // Use a single loop to process filteredHeaders
    const records = filteredHeaders.map(header => ({
        business_id: header.business_id,
        email: header.email,
        plan_name: header.plan_name,
        plan_price: header.plan_price,
        payment_platform_name: header.payment_platform_name
    }));

    await csvWriter.writeRecords(records);
};

await genCSV();



/*
insights here, subscriptions.plain.id is of type Object.ID,
JSON API's like REST or GRAPHQL, doesn't support Object.ID since it is 
a mongoDB specific type.
If you wish to send subscriptions over a JSON API, convert the entire subscription to json object using the .lean() method and then convert plain id to string using the toString() method

*/
