import Pricing from "components/feature/External/HomeSections/Pricing/Pricing";

function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: ["0", "0"],
      startLabel: "Start Now",
      featureLabel: "Free Includes:",
      features: [
        "Study Creation",
        "Written Participant Notes",
        "Participant Status Tracker",
      ],
    },

    {
      name: "Premium",
      price: ["249", "199"],
      startLabel: "Start Free 3 Month Trial",
      featureLabel: "Everything in Free, and:",
      features: [
        "Participant Reminders",
        "Scheduled Meetings",
        "Instant Messaging",
      ],
    },
  ];

  return (
    <Pricing
      title="Pricing Plans"
      description="Start with a free three-month trial, and then pick a plan of your liking. Account plans unlock additional features, and newer features may arrive at higher tiers first."
      plans={plans}
    />
  );
}

export default PricingSection;
