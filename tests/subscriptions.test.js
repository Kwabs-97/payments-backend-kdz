import mongoose from "mongoose";
import { generateSubs } from "../model/index.js";
import { Plan, Subscription } from "../schemas/index.js";
import { insertSubs } from "../model/index.js";
import dotenv from 'dotenv'
dotenv.config()

describe('Subscription generation and db population Verification', () => {
    //setup and tear down
    beforeAll(async () => {
        console.log('connecting to database')
        await mongoose.connect(`mongodb+srv://thisissamuelyeboah:${process.env.DB_USER_PASSWORD}@kwabscluster.d7jjk.mongodb.net/`)
        console.log('connected to database')
    })
    afterAll(async () => {
        await mongoose.connection.close();
    })

    //clear subscription collection before each test
    beforeEach(async () => {
        await Subscription.deleteMany({});
    })

    describe('subs generation and insertion', () => {
        it('generation subsription data and insert into subscription collection', async () => {

            const plans = await Plan.find({})
            const generatedSubscriptions = await generateSubs(plans);
            expect(generatedSubscriptions.length).toBe(24500);

            const insertedSubscriptions = await insertSubs(generatedSubscriptions);
            expect(insertedSubscriptions.length).toBe(24500);

        })
    })
})