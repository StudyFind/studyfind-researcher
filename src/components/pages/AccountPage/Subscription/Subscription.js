import { useEffect, useState } from "react";
import { useTriggerToast, usePathParams, useCollection } from "hooks";
import { useHistory } from "react-router-dom";

import { auth, firestore, functions } from "database/firebase";
import { toasts } from "templates";

import { Grid, Card, VStack, Heading, Badge, Text } from "@chakra-ui/react";
import { Loader, Page } from "components";
import { SiHive, SiMarketo, SiMicrosoft } from "react-icons/si";

import AccountWrapper from "../AccountWrapper";
import AccountHeader from "../AccountHeader";

import SubscriptionView from "./SubscriptionView";
import SubscriptionForm from "./SubscriptionForm";

function Subscription({ showButtons, handleCancel, handleUpdate }) {
  const [isBilledAnnually, setIsBilledAnnually] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [currentPlan, setCurrentPlan] = useState("");
  const [planItems, setPlanItems] = useState({})
  const [loading, setLoading] = useState(true);
  const [linking, setLinking] = useState(false);
  const [testPlans, setPlans] = useState([])
  const [products, setProducts] = useState([])
  const [retrieving, setRetrieving] = useState(true)

  const triggerToast = useTriggerToast();

  const history = useHistory();

  const { action } = usePathParams();

  const selectedPlanID = {
    standard: {
      annually: "price_1JU1jwIzlngCzbHL32su7mlE",
      monthly: "price_1JU1jQIzlngCzbHLwgm0SVAe",
    },
    premium: {
      annually: "price_1JU1n4IzlngCzbHLAFMoPmtq",
      monthly: "price_1JU1mJIzlngCzbHLsYWJCSFm",
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
    const { data } = await functionRef({ returnUrl: window.location.origin + "/account/subscription" });
    setLinking(false);

    window.location.assign(data.url);
  };

  const getCustomClaimRole = async () => {
    await auth.currentUser.getIdToken(true);
    const decodedToken = await auth.currentUser.getIdTokenResult();
    const plan = decodedToken?.claims?.stripeRole;
    if (plan) { //IF THE HAVE A PLAN, GATHER THE PLAN DETAILS
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
    } else { //IF NOT, GATHER THE PLANS DETAILS
      const docRef = firestore
      .collection("pricing")
      .where("active", "==", true)
      docRef.onSnapshot((snapshot) => { //This is so jank, the way products and prices are stored in firebase made me do it sorry lol
        snapshot.forEach((product) => {
          const docRef = firestore
          .collection("pricing")
          .doc(product.id)
          .collection("prices")
          docRef.onSnapshot((snapshot) => {
            setRetrieving(true)
            snapshot.forEach((price) => {
              setProducts(prev => ([...prev, {name: product.data().name.split(" ")[0], amount: price.data().unit_amount}]))
            })
            setRetrieving(false)
          })
        })
      })
    }
    setCurrentPlan(plan || "basic");
    setSelectedPlan(plan || "standard");
  };

  useEffect(() => {
    if (testPlans.length === 0) {
      getCustomClaimRole();
    }
  }, []);

  useEffect(() => { //Seems like a very inefficient way to accomplish this but it works so /shrug
    if (products.length !== 0 && !retrieving) {
      const plans = [
        {
          icon: SiMarketo,
          name: "standard",
          title: "Standard",
          price: [],
          features: ["Everything in Basic", "Participant Reminders", "Schedule Meetings"],
          isPopular: true,
        }, 
        {
          icon: SiHive,
          name: "premium",
          title: "Premium",
          price: [],
          features: ["Everything in Standard", "Instant Messaging", "Email and Text Notifications"],
        }
      ]
      products.forEach((prod) => {
        plans.forEach((plan) => {
          if (plan.title === prod.name) {
            plan.price.push(prod.amount)
          }
        })
      }) //I make the assumption the yearly price will ALWAYS cost more, this allows me to adapt the data without needing the interval explicitly
      plans.forEach(plan => {
        plan.price.sort((a, b) => (b - a))
      })
      plans.forEach(plan => {
        plan.price = plan.price.map((item, id) => (
          id === 0 ? item / 1200 : item / 100
        ))
      })
      plans.forEach(plan => {
        plan.price.sort((a, b) => (b - a))
      })
      plans.forEach(plan => {
        plan.price = plan.price.map((item) => (
          `$${item}`
        ))
      })
      setPlans(plans)
      setLoading(false)
    }
  }, [retrieving])

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
        ) : currentPlan !== "basic" ? (
          <SubscriptionView
            isBilledAnnually={isBilledAnnually}
            currentPlan={currentPlan}
            planItems={planItems}
            linking={linking}
            handleManageSubscription={handleManageSubscription}
          />
        ) : (
            <SubscriptionForm
              plans={testPlans}
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
