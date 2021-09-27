import { useEffect, useState } from "react";
import { useTriggerToast, usePathParams, useCollection } from "hooks";
import { useHistory } from "react-router-dom";

import { auth, firestore, functions } from "database/firebase";
import { toasts } from "templates";

import { Grid } from "@chakra-ui/react";
import { Loader } from "components";
import { SiHive, SiMarketo, SiMicrosoft } from "react-icons/si";

import AccountWrapper from "../AccountWrapper";
import AccountHeader from "../AccountHeader";

import SubscriptionView from "./SubscriptionView";
import SubscriptionForm from "./SubscriptionForm";

function Subscription({ showButtons, handleCancel, handleUpdate }) {
  const [isBilledAnnually, setIsBilledAnnually] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [currentPlan, setCurrentPlan] = useState("");
  const [planItems, setPlanItems] = useState({})
  const [loading, setLoading] = useState(true);
  const [linking, setLinking] = useState(false);

  const triggerToast = useTriggerToast();

  const history = useHistory();

  const { action } = usePathParams();

  const selectedPlanID = {
    basic: {
      // annually: "price_1JU1hsIzlngCzbHLkjD7vwaj", UNCOMMENT WHEN MERGING TO PRODUCTION
      annually: "price_1JboRyIzlngCzbHLrjB591Rl",
      // old_monthly: "price_1JU1gaIzlngCzbHLv2NowTqn",
      monthly: "price_1JeTbpIzlngCzbHLBw68zzbH" //cheap monthly
      // test_monthly: "price_1Jbv5aIzlngCzbHLzcyoqZRu",
    },
    standard: {
      // annually: "price_1JU1jwIzlngCzbHL32su7mlE", SAME
      annually: "price_1JboXRIzlngCzbHLp3oycIFU",
      // monthly: "price_1JU1jQIzlngCzbHLwgm0SVAe",
      monthly: "price_1Jbv6KIzlngCzbHLIWwhVEcx",
    },
    premium: {
      // annually: "price_1JU1n4IzlngCzbHLAFMoPmtq", SAME
      annually: "price_1JboY8IzlngCzbHLYG7R09VN",
      // monthly: "price_1JU1mJIzlngCzbHLsYWJCSFm",
      monthly: "price_1Jbv6vIzlngCzbHLkn8dctTn",
    },
  }[selectedPlan][isBilledAnnually ? "annually" : "monthly"];

  const handleChangeBilledAnnually = (_, value) => {
    setIsBilledAnnually(value);
  };

  const handleSelectPlan = (name) => {
    setSelectedPlan(name);
  };

  const handleSubscribe = async () => {
    setLinking(true);

    const docRef = await firestore
      .collection("researchers")
      .doc(auth.currentUser.uid)
      .collection("checkout_sessions")
      .add({
        price: selectedPlanID,
        trial_from_plan: true,
        allow_promotion_codes: true,
        success_url: window.location.origin + "/account/subscription/success",
        cancel_url: window.location.origin + "/account/subscription/cancel",
      });

    docRef.onSnapshot((snapshot) => {
      const { error, url } = snapshot.data();

      if (error) {
        setLinking(false);
        triggerToast(toasts.stripeError(error.message))
      }

      if (url) {
        setLinking(false);
        window.location.assign(url);
      }
    });
  };

  const handleManageSubscription = async () => {
    const FUNCTION_CODE = "ext-firestore-stripe-subscriptions-createPortalLink";
    const functionRef = functions.httpsCallable(FUNCTION_CODE);

    setLinking(true);
    const { data } = await functionRef({ returnUrl: window.location.origin });
    setLinking(false);

    window.location.assign(data.url);
  };

  const getCustomClaimRole = async () => {
    await auth.currentUser.getIdToken(true);
    const decodedToken = await auth.currentUser.getIdTokenResult();
    const plan = decodedToken?.claims?.stripeRole;
    if (plan) {
      const docRef = firestore
      .collection("researchers")
      .doc(auth.currentUser.uid)
      .collection("subscriptions")

      docRef.onSnapshot((snapshot) => {
        /*
        ASSUMING ONLY 1 SUBSCRIPTION PER RESEARCHER, MAY NEED TO UPDATE TO ACCOUNT FOR MULTIPLE SUBSCRIPTION TYPES
        */
        snapshot.forEach((subscription) => {
          const {items, current_period_end, cancel_at_period_end} = subscription.data()
          const {amount} = (items[0]).plan
          setPlanItems({
            amount,
            current_period_end: current_period_end.toDate(),
            cancel_at_period_end
          })
        })
      })
    }

    setCurrentPlan(plan || "free");
    setSelectedPlan(plan || "basic");
    setLoading(false);
  };

  useEffect(() => {
    getCustomClaimRole();
  }, []);

  useEffect(() => {
    if (action) {
      if (action === "cancel") {
        triggerToast(toasts.stripeCancel);
      }

      if (action === "success") {
        triggerToast(toasts.stripeSuccess)
      }

      history.push("/account/subscription");
    }
  }, [action]);

  const plans = [
    {
      icon: SiMicrosoft,
      name: "basic",
      title: "Basic",
      price: ["$29", "$19"],
      features: ["Create Studies", "Recruit Participants", "Track Participant Status"],
    },

    {
      icon: SiMarketo,
      name: "standard",
      title: "Standard",
      price: ["$99", "$79"],
      features: ["Everything in Basic", "Participant Reminders", "Schedule Meetings"],
      isPopular: true,
    },

    {
      icon: SiHive,
      name: "premium",
      title: "Premium",
      price: ["$249", "$199"],
      features: ["Everything in Standard", "Instant Messaging", "Email and Text Notifications"],
    },
  ];

  return (
    <AccountWrapper
      showButtons={showButtons}
      handleCancel={handleCancel}
      handleUpdate={handleUpdate}
    >
      <Grid gap="20px">
        <AccountHeader
          title="Subscription"
          description="Choose the plan that suits you best and click continue to enter your credit card details to purchase the desired plan"
        />
        {loading ? (
          <Loader height="300px" />
        ) : currentPlan !== "free" ? (
          <SubscriptionView
            plans={plans}
            isBilledAnnually={isBilledAnnually}
            currentPlan={currentPlan}
            planItems={planItems}
            linking={linking}
            handleManageSubscription={handleManageSubscription}
          />
        ) : (
          <SubscriptionForm
            plans={plans}
            selectedPlan={selectedPlan}
            linking={linking}
            handleSubscribe={handleSubscribe}
            handleSelectPlan={handleSelectPlan}
            isBilledAnnually={isBilledAnnually}
            handleChangeBilledAnnually={handleChangeBilledAnnually}
          />
        )}
      </Grid>
    </AccountWrapper>
  );
}

export default Subscription;
