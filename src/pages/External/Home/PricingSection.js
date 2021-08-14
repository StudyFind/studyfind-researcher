import Pricing from "components/feature/External/Pricing/Pricing";

import { SiHive, SiMarketo, SiMicrosoft } from "react-icons/si";

function PricingSection() {
  const plans = [
    {
      icon: SiMicrosoft,
      name: "Basic",
      price: ["$29", "$19"],
      features: [
        "Create Studies",
        "Recruit Participants",
        "Track Participant Status",
      ],
    },

    {
      icon: SiMarketo,
      name: "Standard",
      price: ["$99", "$79"],
      features: [
        "Everything in Basic",
        "Participant Reminders",
        "Schedule Meetings",
      ],
      isPopular: true,
    },

    {
      icon: SiHive,
      name: "Premium",
      price: ["$249", "$199"],
      features: [
        "Everything in Standard",
        "Instant Messaging",
        "Email and Text Notifications",
      ],
    },
  ];

  return <Pricing plans={plans} />;
}

export default PricingSection;
