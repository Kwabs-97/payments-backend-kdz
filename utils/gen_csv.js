import { createObjectCsvWriter } from "csv-writer";
async function genCSV(headers) {

    const csvWriter = createObjectCsvWriter({
        path: 'file.csv',
        header: [
            { id: 'business_id', title: 'business_id' },
            { id: 'email', title: 'email' },
            // { id: 'plan_id', title: 'plan_id'},
            { id: 'plan_name', title: 'plan_name' },
            { id: 'plan_price', title: 'plan_price' },
            { id: 'payment_platform_name', title: 'payment_platform_name' }
        ]
    });

    const records = [];
    for (let i = 0; i < headers.length; i++) {
        for (header in headers) {
            records.push({
                business_id: header.business_id, email: header.email, plan_name: header.plan.name, plan_price: header.plan_price, payment_platform_name: header.payment_platform_name
            })
        }
    }
    await csvWriter.writeRecords(records);

}

export default genCSV;