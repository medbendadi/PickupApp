import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
   const { price, title } = req.body
   if (req.method === 'POST') {
      try {
         const params = {
            mode: 'payment',
            line_items: {
               price_data: {
                  currency: 'usd',
                  product_data: {
                     name: title,
                     images: 'https://i.pinimg.com/originals/0a/1f/82/0a1f820e29719c7b67e9d5aa44241155.png',
                  },
                  unit_amount: price * 100,
               },
               // adjustable_quantity: {
               //    enabled: true,
               //    minimum: 1,
               // },
               quantity: 1,
            },
            success_url: `https://pickup-self.vercel.app/success`,
            cancel_url: `https://pickup-self.vercel.app/cancel`,
         }

         // Create Checkout Sessions from body params.
         const session = await stripe.checkout.sessions.create(params);

         res.status(200).json(session);
      } catch (err) {
         res.status(err.statusCode || 500).json(err.message);
      }
   } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
   }
}