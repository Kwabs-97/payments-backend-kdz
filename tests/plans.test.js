import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()
import { insertPlans } from "../model"
import dbConnect from "../config/mongoose"
import { Plan, Subscription } from "../schemas"
describe("Plan population verification", () => {
    //setup and tear down
    beforeAll(async () => {
        //connect to the databse
        // jest.setTimeout(100000)
        await mongoose.connect(`mongodb+srv://thisissamuelyeboah:${process.env.DB_USER_PASSWORD}@kwabscluster.d7jjk.mongodb.net/`)
    })
    afterAll(async () => {

        //disconnect from the database
        await mongoose.connection.close()
    })

    beforeEach(async () => {

        // Clear collections before each test
        await Plan.deleteMany({});
    });

    describe('Plan creation and Polution', () => {
        it("should create and populate 4 plans correclty", async () => {
            const insertedPlans = await insertPlans();
            expect(insertedPlans.length).toBe(4);
        })
    })

})  