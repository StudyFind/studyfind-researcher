import { useColor, useDetectDevice } from "hooks";
import { auth } from "database/firebase";
import { Box, Heading, Text, Tabs, TabList, TabItem, TabPanels, TabPanel } from "@chakra-ui/react";

import StudyCardLarge from "components/feature/Study/StudyCard/StudyCardLarge";
import LocationsList from "components/feature/Study/LocationsList/LocationsList";

function Review({ newStudy }) {
  const { isPhone } = useDetectDevice();

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
  ];

  const color = useColor("gray.400", "gray.500");
  const borderColor = useColor("gray.300", "gray.600");

  return (
    <Box paddingY="20px">
      <Heading>Review</Heading>
      <Text color="gray.500" paddingTop="5px" paddingBottom="10px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      </Text>

      <Tabs colorScheme="blue" height="100%">
        <TabList
          overflowX={isPhone && "scroll"}
          overflowY={isPhone && "hidden"}
          borderBottomWidth={isPhone ? "0" : "2px"}
          borderBottomColor={borderColor}
          height="42px"
        >
          {tabs.map((t, i) => (
            <TabItem key={i} color={color} borderBottomColor={borderColor}>
              {t.name}
            </TabItem>
          ))}
        </TabList>
        <TabPanels>
          {tabs.map((t, i) => (
            <TabPanel key={i} olor={color} borderBottomColor={borderColor}>
              {t.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default Review;
