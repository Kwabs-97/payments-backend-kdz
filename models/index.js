import { Plans, Susbscription } from "../schemas/model"
import { v4 as uuidv4 } from 'uuid'


const insertData = async () => {

    const plansData = [{
        name: 'Freemium',
        price: 0,
        period: 'monthly',
        status: 'A',
        features: {
            videos: false,
            audio: true,
            download: false,
            streaming: false,
            customize: false
        }
    },
    {
        name: 'Bronze', price: 30,
        period: 'monthly',
        status: 'A',
        features: {
            videos: true,
            audio: true,
            download: false,
            streaming: false,
            customize: false
        }
    },
    {
        name: 'Silver',
        price: 50,
        period: 'monthly',
        status: 'A',
        features: {
            videos: true,
            audio: true,
            download: false,
            streaming: false,
            customize: true
        }
    },
    {
        name: 'Platinum',
        price: 100,
        period: 'monthly',
        status: 'A',
        features: {
            videos: true,
            audio: true,
            download: true,
            streaming: true,
            customize: true
        }
    }

    ]





    // insert plans 
    const insertPlans = async () => {

        try {
            console.log("inserting plans data ---")
            await Plans.insertMany(plansData);
            console.log("inserting plans data --- complete")
        } catch (error) {
            console.log('error inserting plans data ---', error)
        }
    }
    insertPlans()





    //susbscription data generation and insertion start

    // const platinumSubscription = {
    //     business_id: generate_unique_id,
    //     email: unique_business_email,
    //     plan_id: platinum_id, //This represents the id of the
    //     platinum plan
    //     payment_platform: {
    //     token: random_string_token,
    //     external_id: random_string,
    //     name: 'stripe' or 'paypal'
    //     }
    //     }
    const subscriptions = [];
    function genSubscriptionData() {
        //subscription data
        const subscriptionCounts = {
            Freemium: 500,
            Bronze: 7000,
            Silver: 12000,
            Gold: 8000,
            Platinum: 5000
        }

        //generate subscription data

        console.log("generating subscription data --- start")
        for (const plan of plansData) {
            const count = subscriptionCounts[plan.name]
            for (let i = 0; i < count; i++) {
                subscriptions.push({
                    business_id: uuidv4(),
                    email: `unique_business@${i}.com`,
                    plan_id: plan._id,
                    payment_platform: {
                        token: uuidv4(),
                        external_id: uuidv4(),
                        name: Math.random() > 0.5 ? 'Stripe' : 'Paypal',

                    }
                })
            }
        }
        console.log("generating subscription data --- complete")

        console.log("subscription data ---", subscriptions)

        const insertSubscriptions = async () => {
            try {
                console.log("inserting subscription data --- start")
                await Susbscription.insertMany(subscriptions)
            } catch (error) {
                console.log("error inserting subscription data", error)
            }
        }


        insertSubscriptions()
    }



}









