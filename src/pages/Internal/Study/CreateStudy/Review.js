import { auth } from "database/firebase";
import { Button } from "@chakra-ui/react";
import { Message } from "components";

import StudyCardLarge from "components/feature/Study/StudyCard/StudyCardLarge";
import LocationsList from "components/feature/Study/LocationsList/LocationsList";
import HorizontalTabs from "components/complex/HorizontalTabs/HorizontalTabs";
import QuestionsTable from "components/feature/Study/QuestionsTable/QuestionsTable";
import ResourcesList from "components/feature/Study/ResourcesList/ResourcesList";

function Review({ study, Wrapper, goBack }) {
  const title = "Review";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation";

  const tabs = [
    {
      name: "Details",
      content: (
        <StudyCardLarge
          study={{
            ...study,
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
    {
      name: "Locations",
      content: study.locations.length ? (
        <LocationsList locations={study.locations} />
      ) : (
        <Message
          title="No Locations"
          description="Locations are used when filtering for users trying to find studies near them and therefore adding locations improves their chances of finding your study"
          height="300px"
          showBackground
        >
          <Button onClick={() => goBack(3)}>Add Locations</Button>
        </Message>
      ),
    },
    {
      name: "Questions",
      content: study.questions.length ? (
        <QuestionsTable questions={study.questions} />
      ) : (
        <Message
          title="No Questions"
          description="Questions are used to screen participants when signing up for your study and automatically assigns them an eligibility score based on their responses"
          height="300px"
          showBackground
        >
          <Button onClick={() => goBack(2)}>Add Questions</Button>
        </Message>
      ),
    },
    {
      name: "Resources",
      content: study.resources.length ? (
        <ResourcesList resources={study.resources} />
      ) : (
        <Message
          title="No Resources"
          description="Resources are any useful links relevant to the research study (like marketing material or external surveys) that need to be shared with participants"
          height="300px"
          showBackground
        >
          <Button onClick={() => goBack(1)}>Add Resources</Button>
        </Message>
      ),
    },
  ];

  return (
    <Wrapper title={title} description={description}>
      <HorizontalTabs tabs={tabs} useURL={false} paddingY="20px" />
    </Wrapper>
  );
}

export default Review;
