import { useContext, useEffect, useState } from "react";

import { auth, firestore, functions } from "database/firebase";
import { Box, Button, Tooltip } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { Page } from "@studyfind/components";


function Pricing() {

  const [userStripeRole, setUserStripeRole] = useState();
  const [loading, setLoading] = useState(true);

  const handleSubscribe = async () => {
    const docRef = await firestore
      .collection('researchers')
      .doc(auth.currentUser.uid)
      .collection('checkout_sessions')
      .add({
        price: 'price_1JNtOPB81AOb8bDhopoIQFDH',
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
    const functionRef = functions
      .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
    const { data } = await functionRef({ returnUrl: window.location.origin });
    window.location.assign(data.url);
  }

  const getCustomClaimRole = async () => {
    await auth.currentUser.getIdToken(true);
    const decodedToken = await auth.currentUser.getIdTokenResult();
    if (decodedToken && decodedToken.claims && decodedToken.claims.stripeRole){
      setUserStripeRole(decodedToken.claims.stripeRole);
      setLoading(false);
    }
    else{
      setUserStripeRole('basic');
      setLoading(false);
    }
  }

  useEffect(() => {
    getCustomClaimRole();
  }, []);

  return (
    <>
      <Page isLoading={loading}>
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
