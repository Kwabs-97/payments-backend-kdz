import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import dotenv from 'dotenv'

import { Subscription } from '../schemas/index.js';
import mongoose from 'mongoose';
import { getSubs } from '../model/index.js';

dotenv.config()

const csvData = fs.readFileSync('./file.csv', 'utf8');
const { data } = Papa.parse(csvData, { header: true, dynamicTyping: true })

// Filter out empty rows
const structuredCSVRows = data.filter(row => {
    // Ensure the row is not null, not undefined, and has at least one non-empty value
    return row && Object.values(row).some(value => value !== null && value !== '');
});


describe('csv verfication', () => {
    beforeAll(async () => {
        console.log('connecting to database')
        await mongoose.connect(`mongodb+srv://thisissamuelyeboah:${process.env.DB_USER_PASSWORD}@kwabscluster.d7jjk.mongodb.net/`)
        console.log('connected to database')
    })
    afterAll(async () => {
        await mongoose.connection.close()
    })


    describe('compare subscription size to csv size', () => {
        it('measure and compare sizes', async () => {
            const subscriptions = await getSubs();


            const paidSubscriptions = subscriptions.filter((subscription) => {
                return subscription.plan_id.price >= 50;
            });


            const subscriptionData = Object.values(paidSubscriptions);
            expect(subscriptionData.length).toEqual(structuredCSVRows.length)
        })
    })

    describe('paid plan', () => {
        it('should return plan price >= 50', () => {
            const paidSubscriptions = structuredCSVRows.every((row) => row.plan_price >= 50)
            expect(paidSubscriptions).toBe(true)
        })
    })
})



