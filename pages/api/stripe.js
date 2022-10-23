import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
   const { price, user, type } = req.body
   const { username } = user

   if (req.method === 'POST') {
      try {
         // Create Checkout Sessions from body params.
         const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
               {
                  price_data: {
                     currency: 'usd',
                     product_data: {

                        name: 'Pickup',
                        images: ['https://i.postimg.cc/Bn6jBLtr/original-892677c725f1b56cfbdd8031e35c3f90-4.jpg'],
                     },
                     unit_amount: parseFloat(price) * 100,
                  },
                  quantity: 1,
               },
            ],
            mode: 'payment',
            success_url: `https://pickup-self.vercel.app/success?sessionId=${session.id}?username=${username}?type=${type}`,  // can send in the id of the order if already created with the property of the payment pending
            cancel_url: `https://pickup-self.vercel.app/confirm`,
         });

         res.status(200).json(session);
      } catch (err) {
         res.status(err.statusCode || 500).json(err.message);
      }
   } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
   }
}