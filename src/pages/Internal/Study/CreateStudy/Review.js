import { auth } from "database/firebase";
import { Box, Heading, Text } from "@chakra-ui/react";

import StudyCardLarge from "components/feature/Study/StudyCard/StudyCardLarge";
import LocationsList from "components/feature/Study/LocationsList/LocationsList";
import HorizontalTabs from "components/complex/HorizontalTabs/HorizontalTabs";
import QuestionsTable from "components/feature/Study/QuestionsTable/QuestionsTable";

function Review({ newStudy }) {
  const tabs = [
    {
      name: "Details",
      content: (
        <StudyCardLarge
          study={{
            ...newStudy,
            activated: false,
            researcher: {
              id: auth.currentUser.uid,
              name: auth.currentUser.displayName,
              email: auth.currentUser.email,
            },
          }}
        />
      ),
    },
    { name: "Locations", content: <LocationsList locations={newStudy.locations} /> },
    { name: "Questions", content: <QuestionsTable questions={newStudy.questions} /> },
    // { name: "Resources", content: <ResourcesList resources={newStudy.resources} /> },
  ];

  return (
    <Box paddingY="20px">
      <Heading>Review</Heading>
      <Text color="gray.500" paddingTop="5px" paddingBottom="10px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      </Text>
      <HorizontalTabs tabs={tabs} useURL={false} paddingY="20px" />
    </Box>
  );
}

export default Review;
