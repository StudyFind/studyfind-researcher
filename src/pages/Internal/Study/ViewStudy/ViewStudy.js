import HorizontalTabs from "components/complex/HorizontalTabs/HorizontalTabs";

import Details from "./Details/Details";
import Locations from "./Locations/Locations";
import Questions from "./Questions/Questions";
import Files from "./Files/Files";
import Participants from "./Participants/Participants";
import Settings from "./Settings/Settings";

function ViewStudy() {
  const study = {};

  const tabs = [
    {
      name: "Details",
      link: `/study/${study.id}/details`,
      content: <Details study={study} />,
    },
    {
      name: "Locations",
      link: `/study/${study.id}/locations`,
      content: <Locations study={study} />,
    },
    {
      name: "Questions",
      link: `/study/${study.id}/screening`,
      content: <Questions study={study} />,
    },
    {
      name: "Files",
      link: `/study/${study.id}/files`,
      content: <Files />,
    },
    {
      name: "Participants",
      link: `/study/${study.id}/participants`,
      content: <Participants />,
    },
    {
      name: "Settings",
      link: `/study/${study.id}/settings`,
      content: <Settings study={study} />,
    },
  ];

  return <HorizontalTabs tabs={tabs} paddingY="20px" />;
}

export default ViewStudy;
