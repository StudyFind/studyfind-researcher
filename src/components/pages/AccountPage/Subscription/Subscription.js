import { useContext, useEffect, useState } from "react";
import { useTriggerToast, usePathParams } from "hooks";
import { useHistory } from "react-router-dom";

import { PlanContext } from "context";

import { auth, firestore, functions } from "database/firebase";
import { signout } from "database/auth";
import { toasts } from "templates";

import { Grid } from "@chakra-ui/react";
import { Loader } from "components";
import { SiHive } from "react-icons/si";

import AccountWrapper from "../AccountWrapper";
import AccountHeader from "../AccountHeader";

import SubscriptionView from "./SubscriptionView";
import SubscriptionForm from "./SubscriptionForm";

const getStripePriceID = (plan, period) => {
  if (plan === "FREE") {
    return "";
  }
  return {
    PREMIUM: {
      annually: "price_1JU1n4IzlngCzbHLAFMoPmtq",
      monthly: "price_1JU1mJIzlngCzbHLsYWJCSFm",
    },
  }[plan][period];
};

const plans = [
  {
    icon: SiHive,
    name: "FREE",
    title: "Free",
    price: ["$0", "$0"],
    features: [
      "Create Studies",
      "Write Participant Notes",
      "Track Participant Status",
    ],
  },
  {
    icon: SiHive,
    name: "PREMIUM",
    title: "Premium",
    price: ["$249", "$199"],
    features: [
      "Everything in Free",
      "Instant Messaging",
      "Email and Text Notifications",
    ],
  },
];

function Subscription({ showButtons, handleCancel, handleUpdate }) {
  const history = useHistory();
  const triggerToast = useTriggerToast();
  const currentPlan = useContext(PlanContext);

  const [isBilledAnnually, setIsBilledAnnually] = useState(true);
  const [hasActivePlan, setHasActivePlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("FREE");
  const [planDetails, setPlanDetails] = useState({});

  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  const { action } = usePathParams();

  const period = isBilledAnnually ? "annually" : "monthly";
  const selectedPriceID = getStripePriceID(selectedPlan, period);

  const retrieveUserPlanDetails = async () => {
    const snapshot = await firestore
      .collection("researchers")
      .doc(auth.currentUser.uid)
      .collection("subscriptions")
      .where("status", "!=", "canceled")
      .limit(1)
      .get();

    if (snapshot.docs.length) {
      const planDetails = snapshot.docs[0].data();

      const status = planDetails.status;
      const amount = (planDetails.items[0].plan.amount / 100).toFixed(2);
      const current_period_end = planDetails.current_period_end;
      const cancel_at_period_end = planDetails.cancel_at_period_end;

      setHasActivePlan(true);
      setPlanDetails({
        status,
        amount,
        current_period_end: current_period_end.toDate(),
        cancel_at_period_end,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    if (currentPlan !== "FREE") {
      retrieveUserPlanDetails();
    } else {
      setLoading(false);
    }
  }, [currentPlan]);

  const handleChangeBilledAnnually = (_, value) => {
    setIsBilledAnnually(value);
  };

  const handleSelectPlan = (name) => {
    setSelectedPlan(name);
  };

  const handleSubscribe = async () => {
    setRedirecting(true);

    const docRef = await firestore
      .collection("researchers")
      .doc(auth.currentUser.uid)
      .collection("checkout_sessions")
      .add({
        price: selectedPriceID,
        trial_from_plan: true,
        allow_promotion_codes: true,
        success_url: window.location.origin + "/account/subscription/success",
        cancel_url: window.location.origin + "/account/subscription/cancel",
      });

    docRef.onSnapshot((snapshot) => {
      const { error, url } = snapshot.data();

      if (error) {
        setRedirecting(false);
        triggerToast(toasts.stripeError);
      }

      if (url) {
        setRedirecting(false);
        window.location.assign(url);
      }
    });
  };

  const handleManageSubscription = async () => {
    const FUNCTION_CODE = "ext-firestore-stripe-subscriptions-createPortalLink";
    const functionRef = functions.httpsCallable(FUNCTION_CODE);

    setRedirecting(true);

    const { data } = await functionRef({
      returnUrl: window.location.origin + "/account/subscription",
    });

    setRedirecting(false);

    window.location.assign(data.url);
  };

  useEffect(() => {
    if (action) {
      if (action === "cancel") {
        triggerToast(toasts.stripeCancel);
      }

      if (action === "success") {
        signout();
        triggerToast(toasts.stripeSuccess);
      }

      history.push("/account/subscription");
    }
  }, [action]);

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
        ) : hasActivePlan ? (
          <SubscriptionView
            isBilledAnnually={isBilledAnnually}
            currentPlan={currentPlan}
            planDetails={planDetails}
            redirecting={redirecting}
            handleManageSubscription={handleManageSubscription}
          />
        ) : (
          <SubscriptionForm
            plans={plans}
            selectedPlan={selectedPlan}
            redirecting={redirecting}
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
