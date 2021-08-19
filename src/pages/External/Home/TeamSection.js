import Yohan from "images/Yohan.png";
import Andrew from "images/Andrew.png";
import Vir from "images/Vir.png";
import Team from "components/feature/External/HomeSections/Team/Team";

function TeamSection() {
  const title = "About the team";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation";

  const founders = [
    {
      image: Yohan,
      name: "Yohan Jhaveri",
      position: "Co-Founder",
      description:
        "Habitant morbi tristique senectus et netus et malesuada fames. Vestibulum morbi",
    },
    {
      image: Andrew,
      name: "Andrew Garcia",
      position: "Co-Founder",
      description:
        "Habitant morbi tristique senectus et netus et malesuada fames. Vestibulum morbi",
    },
    {
      image: Vir,
      name: "Vir Mittal",
      position: "Co-Founder",
      description:
        "Habitant morbi tristique senectus et netus et malesuada fames. Vestibulum morbi",
    },
  ];

  const panels = [
    {
      title: "Interns",
      colorScheme: "blue",
      description:
        "Our interns have put in the time and effort to deliver the best quality product for researchers to use.",
      buttonText: "Meet the Interns",
    },
    {
      title: "Advisory Board",
      colorScheme: "teal",
      description:
        "Our advisory board has given us the direction and strategy needed to build a product researchers love.",
      buttonText: "Meet the Advisory Board",
    },
    {
      title: "Collaborations",
      colorScheme: "purple",
      description:
        "Our collaborations have enabled us to constantly push boundaries and develop experimental products.",
      buttonText: "View our Collaborations",
    },
  ];

  return <Team title={title} description={description} founders={founders} panels={panels} />;
}

export default TeamSection;
