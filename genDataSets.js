KUDOBUZZ INTERVIEW NODE.JS ASSESSMENT​
​
// Data Set
// Generate the data below and add it to your database.
// - Add plans data to the database.
// - Create subscriptions:-
// - 500 instances of the freemium subscription.
// - 7000 instances of the bronze subscription.
// - 12000 instances of the silver subscription.
// - 8000 instances of the gold subscription.
// - 5000 instances of the platinum subscription.
// - Create a unique business id for each subscription instance​

// Schemas​
// Plans Schema


{
name: 'String',​
price: 'Number',
period: 'String',
status: 'A' | 'D',
features: {​
videos: boolean,
audio: boolean,
download: boolean,
streaming: boolean,
customize: boolean​
}
payment_platform_name}
​
//Subscription Schema​
{
business_id: 'String',
email: 'String',
plan_id: 'String',
payment_platform: {
token: 'String',
external_id: 'String',
name: 'Stripe' | 'Paypal
}
}
// Plans Data
// - Populate your schemas/collections using the data set examples below:​
const platinum = {
name: 'Platinum',
price: 100,
period: 'monthly',
status: 'A',
features: {
videos: true,
audio: true,
download: true,
streaming: true,
customize: true}
}
const gold = {
name: 'Gold',
price: 70,
period: 'monthly',
status: 'A',
features: {
videos: true,
audio: true,
download: false,
streaming: true,
customize: true
}
}
const silver = {
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
}
const bronze = {
name: 'Bronze',
price: 30,
period: 'monthly',
status: 'A',
features: {
videos: true,
audio: true,
download: false,
streaming: false,
customize: false
}
}
const freemium = {
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
}

//Subscription Data

const platinumSubscription = {
business_id: generate_unique_id,
email: unique_business_email,
plan_id: platinum_id, 
payment_platform: {
token: random_string_token,
external_id: random_string,
name: 'stripe' || 'paypal'
}
}
const goldSubscription = {
business_id: generate_unique_id,
email: unique_business_email,
plan_id: gold_id, 
payment_platform: {
token: random_string_token,
external_id: random_string,
name: 'stripe' || 'paypal'
}
}
const silverSubscription = {
business_id: generate_unique_id,
email: unique_business_email,
plan_id: silver_id, 
payment_platform: {token: random_string_token,
external_id: random_string,
name: 'stripe' || 'paypal'
}
}
const bronzeSubscription = {
business_id: generate_unique_id,
email: unique_business_email,
plan_id: bronze_id,
payment_platform: {
token: random_string_token,
external_id: random_string,
name: 'stripe' || 'paypal'
}
}
const freeSubscription = {
business_id: generate_unique_id,
email: unique_business_email,
plan_id: freemium_id, //This represents the id of the
payment_platform: {
token: random_string_token,
external_id: random_string,
name: 'stripe' || 'paypal'
}
}

