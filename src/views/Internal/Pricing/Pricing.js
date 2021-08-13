import { useContext, useEffect, useState } from "react";
import { StripeContext } from "context";

import { auth, firestore, functions } from "database/firebase";
import { Box, Button, Tooltip } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { Page } from "@studyfind/components";


function Pricing() {

  const userStripeRole = useContext(StripeContext);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    const docRef = await firestore
      .collection('researchers')
      .doc(auth.currentUser.uid)
      .collection('checkout_sessions')
      .add({
        price: 'price_1JNtOPB81AOb8bDhopoIQFDH',
        trial_from_plan: true,
        allow_promotion_codes: true,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    // Wait for the CheckoutSession to get attached by the extension
    docRef.onSnapshot((snap) => {
      const { error, url } = snap.data();
      if (error) {
        // Show an error to your customer and 
        // inspect your Cloud Function logs in the Firebase console.
        console.log(`An error occured: ${error.message}`);
      }
      if (url) {
        // We have a Stripe Checkout URL, let's redirect.
        window.location.assign(url);
      }
    });
  }

  const handleManageSubscription = async () => {
    setLoading(true);
    const functionRef = functions
      .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
    const { data } = await functionRef({ returnUrl: window.location.origin });
    window.location.assign(data.url);
  }

  return (
    <>
      <Page isLoading={!(userStripeRole) || loading}>
        {(userStripeRole==='premium') ? (
          <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={() => handleManageSubscription()}>
            Manage Subscription
          </Button>
        ) : (
          <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={() => handleSubscribe()}>
            Subscribe
          </Button>
        )}
      </Page>
    </>
  );
}

export default Pricing;
