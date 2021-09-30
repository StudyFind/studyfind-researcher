import { useDocument, usePathParams } from "hooks";
import { firestore } from "database/firebase";

import { Loader, Message } from "components";
import { Box } from "@chakra-ui/react";

import HorizontalTabs from "components/complex/HorizontalTabs/HorizontalTabs";
import Details from "./Details/Details";
import Locations from "./Locations/Locations";
import Questions from "./Questions/Questions";
import Resources from "./Resources/Resources";
import Files from "./Files/Files";
import Participants from "./Participants/Participants";
import Settings from "./Settings/Settings";

function ViewStudy() {
  const { studyID } = usePathParams();

  const [study, loading, error] = useDocument(
    firestore.collection("studies").doc(studyID)
  );

  if (!study || loading) {
    return <Loader height="calc(100vh - 80px)" />;
  }

  if (!study.title) {
    return (
      <Box height="400px" rounded="md">
        <Message
          status="failure"
          title="Study Not Found"
          description={`The study with ID "${studyID}" does not exist in our database. It may have been either deleted or never existed in the first place.`}
          showBackground
        />
      </Box>
    );
  }

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
      link: `/study/${study.id}/questions`,
      content: <Questions study={study} />,
    },
    {
      name: "Resources",
      link: `/study/${study.id}/resources`,
      content: <Resources study={study} />,
    },
    {
      name: "Files",
      link: `/study/${study.id}/files`,
      content: <Files study={study} />,
    },
    {
      name: "Participants",
      link: `/study/${study.id}/participants`,
      content: <Participants study={study} />,
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
