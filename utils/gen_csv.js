import { createObjectCsvWriter } from "csv-writer";
const genCSV = async (header ,recordsArr) => {
    const csvWriter = createObjectCsvWriter({
        path: 'file.csv',
        header
    });

    const records = recordsArr.map(record => ({
        business_id: record.business_id,
        email: record.email,
        plan_id: record.plan_id,
        plan_name: record.plan_name,
        plan_price: record.plan_price,
        payment_platform_name: record.payment_platform_name
    }));

    await csvWriter.writeRecords(records);
};

await genCSV();
export default genCSV;