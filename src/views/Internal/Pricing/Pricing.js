import { useContext, useState } from "react";
import { StripeContext } from "context";

import { auth, firestore, functions } from "database/firebase";
import { Box, Grid, Heading, Switch, Text } from "@chakra-ui/react";
import { Loader } from "@studyfind/components";

import { SiHive } from "react-icons/si";
import PricingCard from "./PricingCard";


function Pricing() {

  const userStripeRole = useContext(StripeContext);
  const [loading, setLoading] = useState(false);
  const [billedAnnually, setBilledAnually] = useState(true);

  const handleSubscribe = async () => {
    setLoading(true);
    const docRef = await firestore
      .collection('researchers')
      .doc(auth.currentUser.uid)
      .collection('checkout_sessions')
      .add({
        price: billedAnnually? 'price_1JOMbtB81AOb8bDh5omTaX6a' : 'price_1JNtOPB81AOb8bDhopoIQFDH',
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

  const plans = {
    premium: {
      icon: SiHive,
      name: "Premium",
      price: ["$5", "$4"],
      features: ["Instant Messaging", "Meetings and Reminders Scheduling", "Email and Text Notifications"],
    },
  };

  const handleChange = (e) => {
    setBilledAnually(e.target.checked);
  };

  if (!(userStripeRole) || loading) return (<Loader/>);

  return (
    <Box bg="gray.100" p="100px">
      <Heading fontWeight="extrabold" mb="12px">
        Pricing Plans
      </Heading>
      <Text color="gray.600" w="450px">
        Start with a free 1 month trial and then pick the plan of your liking. Account plans
        unlock additional features and newer features may arrive to higher tier plans first.
      </Text>
      <Text fontWeight="medium" mt="24px" mb="48px">
        Monthly <Switch mx="6px" isChecked={billedAnnually} onChange={handleChange} /> Annually
      </Text>
      <Grid gap="30px" templateColumns={"1fr"}>
        {(userStripeRole==='premium') ? (
          <PricingCard billedAnnually={billedAnnually} handleClick={handleManageSubscription} subscribed={true} {...plans.premium} />
        ) : (
          <PricingCard billedAnnually={billedAnnually} handleClick={handleSubscribe} subscribed={false} {...plans.premium} />
        )}
      </Grid>
    </Box>
  );
}

export default Pricing;
