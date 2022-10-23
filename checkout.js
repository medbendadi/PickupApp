import { loadStripe } from "@stripe/stripe-js";


export const checkout = async ({ lineItems }) => {
   let stripePromise = null

   const getStripe = () => {
      if (!stripePromise) {
         stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY)
      }

      return stripePromise
   }

   const stripe = await getStripe()


   await stripe.redirectToCheckout({
      node: 'payment',
      lineItems,
      successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: window.location.origin
   })

}