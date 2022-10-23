import { loadStripe } from "@stripe/stripe-js";


export const checkout = async (currentData) => {
   let stripePromise = null

   const getStripe = () => {
      if (!stripePromise) {
         stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY)
      }

      return stripePromise
   }

   const stripe = await getStripe()


   // console.log(currentData);

   const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentData),
   })

   if (response.statusCode === 500) return

   const data = await response.json()

   console.log(data);
   await stripe.redirectToCheckout({ sessionId: data.id })

}