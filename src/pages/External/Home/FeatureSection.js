import Features from "components/feature/External/Features/Features";

import {
  FcDoughnutChart,
  FcMultipleDevices,
  FcPrivacy,
  FcTimeline,
} from "react-icons/fc";

function FeatureSection() {
  const features = [
    {
      icon: <FcPrivacy />,
      title: "Secured by default",
      description:
        "At vero eos et accusam et justo duo dolores et ea rebum. Stet clitakasd gubergren, no sea takimata sanctus.",
    },
    {
      icon: <FcTimeline />,
      title: "Always up to date",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diamnonumy eirmod tempor invidunt ut labore.",
    },
    {
      icon: <FcDoughnutChart />,
      title: "Incredible statistics",
      description:
        "At vero eos et accusam et justo duo dolores et ea rebum. Stet clitakasd gubergren, no sea takimata sanctus.",
    },
    {
      icon: <FcPrivacy />,
      title: "Support for multiple devices",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diamnonumy eirmod tempor invidunt ut labore.",
    },
    {
      icon: <FcTimeline />,
      title: "Incredible statistics",
      description:
        "At vero eos et accusam et justo duo dolores et ea rebum. Stet clitakasd gubergren, no sea takimata sanctus.",
    },
    {
      icon: <FcMultipleDevices />,
      title: "Support for multiple devices",
      description:
        "At vero eos et accusam et justo duo dolores et ea rebum. Stet clitakasd gubergren, no sea takimata sanctus.",
    },
  ];

  return <Features features={features} />;
}

export default FeatureSection;
