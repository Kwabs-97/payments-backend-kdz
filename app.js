import dbConnect from "./config/mongoose.js";
import { getSubs } from "./model/index.js";
import { createObjectCsvWriter } from "csv-writer";
// import { getSubsPaginated } from "./model/index.js";

async function main() {
    await dbConnect();

    // if pagination, uncomment the code below and comment out subscriptions
    // const page = 1,
    // cont limit = 50
    // const paginatedSubscriptions = await getSubsPaginated(page, limit)

    const subscriptions = await getSubs();

    // Filter subscriptions with a plan price greater than or equal to 50
    const paidSubscriptions = subscriptions.filter((subscription) => {
        return subscription.plan_id.price >= 50;
    });

    // Extract the values from the filtered subscriptions
    const subscriptionData = Object.values(paidSubscriptions);

    // Map subscription data to a structured format
    const subscriptionHeaders = subscriptionData.map((subscription) => {
        return {
            business_id: subscription.business_id,
            email: subscription.email,
            plan_id: subscription.plan_id._id,
            plan_name: subscription.plan_id.name,
            plan_price: subscription.plan_id.price,
            payment_platform_name: subscription.payment_platform.name,
        };
    });

    // Function to generate the CSV file
    const generateCSVFile = async (data) => {
        const csvWriter = createObjectCsvWriter({
            path: 'file.csv',
            header: [
                { id: 'business_id', title: 'business_id' },
                { id: 'email', title: 'email' },
                { id: 'plan_id', title: 'plan_id' },
                { id: 'plan_name', title: 'plan_name' },
                { id: 'plan_price', title: 'plan_price' },
                { id: 'payment_platform_name', title: 'payment_platform_name' },
            ],
        });

        // Map data to CSV records
        const csvRecords = data.map((record) => ({
            business_id: record.business_id,
            email: record.email,
            plan_id: record.plan_id,
            plan_name: record.plan_name,
            plan_price: record.plan_price,
            payment_platform_name: record.payment_platform_name,
        }));

        console.log("Generating CSV file -- start");
        await csvWriter.writeRecords(csvRecords);
        console.log("Generating CSV file -- complete");
    };

    // Call the generateCSVFile function with the processed data
    await generateCSVFile(subscriptionHeaders);
}

await main();

/*
Insights:
- `subscriptions.plan_id` is of type `ObjectId`, which is specific to MongoDB.
- JSON APIs like REST or GraphQL do not support `ObjectId`. 
- To send subscriptions over a JSON API, convert the entire subscription to a JSON object using the `.lean()` method and then convert `ObjectId` to a string using the `toString()` method.
*/