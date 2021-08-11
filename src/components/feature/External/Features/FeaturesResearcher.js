import {
  FcDoughnutChart,
  FcMultipleDevices,
  FcPrivacy,
  FcTimeline,
} from "react-icons/fc";

import Feature from "./Feature";
import FeatureList from "./FeatureList";

function FeaturesResearcher() {
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

  return (
    <FeatureList>
      {features.map((feature) => (
        <Feature icon={feature.icon} title={feature.title}>
          {feature.description}
        </Feature>
      ))}
    </FeatureList>
  );
}

export default FeaturesResearcher;
