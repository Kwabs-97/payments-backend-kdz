import { Plans, Susbscription } from "../schemas/model"
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
    console.log("inserting plans data")
    await Plans.insertMany(plansData);
    console.log("plans data inserted -- complete")
}

insertPlans()

const subscriptionCounts= {
    Freemium: 500,
    Bronze: 7000,
    Silver: 12000,
    Gold: 8000,
    Platinum: 5000
}


