import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Papa from 'papaparse';
import { describe, test, expect, beforeEach } from '@jest/globals';


const __dirname = path.dirname("../file.csv");

// Function to filter and save subscriptions
function filterAndSaveSubscriptions(inputCsv, outputCsv) {
    const csvData = fs.readFileSync(inputCsv, 'utf8');
    const { data } = Papa.parse(csvData, { header: true, dynamicTyping: true });
    
    const filteredData = data.filter(row => row.plan_price >= 50);
    const csvOutput = Papa.unparse(filteredData);
    
    fs.writeFileSync(outputCsv, csvOutput);
}

describe('Subscription Filtering', () => {
    let inputCsvPath, outputCsvPath;

    beforeEach(() => {
        inputCsvPath = path.join(__dirname, 'test_input.csv');
        outputCsvPath = path.join(__dirname, 'test_output.csv');
        
        const sampleCsv = `business_id,email,plan_id,plan_name,plan_price,payment_platform_name\n`
            + `123,test1@example.com,001,Gold,100,Paypal\n`
            + `456,test2@example.com,002,Silver,50,Stripe\n`
            + `789,test3@example.com,003,Bronze,30,Paypal\n`;
        
        fs.writeFileSync(inputCsvPath, sampleCsv);
    });

    test('filters subscriptions with plan_price >= 50', () => {
        filterAndSaveSubscriptions(inputCsvPath, outputCsvPath);
        const outputCsvData = fs.readFileSync(outputCsvPath, 'utf8');
        const { data } = Papa.parse(outputCsvData, { header: true, dynamicTyping: true });
        
        expect(data.length).toBe(2);
        expect(data.every(row => row.plan_price >= 50)).toBe(true);
    });
});

export { filterAndSaveSubscriptions };
