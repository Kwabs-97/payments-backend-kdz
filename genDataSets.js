const schemas = {
    plans: {
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
    },
    subscription: {
        
            business_id: 'String',
            email: 'String',
            plan_id: 'String',
            payment_platform: {
            token: 'String',
            external_id: 'String',
            name: 'Stripe' | 'Paypal'
            }
            
    }
}