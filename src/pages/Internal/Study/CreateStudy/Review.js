import { auth } from "database/firebase";
import { Button } from "@chakra-ui/react";
import { Message } from "components";

import StudyCardLarge from "components/feature/Study/StudyCard/StudyCardLarge";
import LocationsList from "components/feature/Study/LocationsList/LocationsList";
import HorizontalTabs from "components/complex/HorizontalTabs/HorizontalTabs";
import QuestionsTable from "components/feature/Study/QuestionsTable/QuestionsTable";
import WizardFormButton from "components/complex/WizardForm/WizardFormButtons";
import CreateStudyWrapper from "./CreateStudyWrapper";
import ResourcesList from "components/feature/Study/ResourcesList/ResourcesList";

function Review({ loading, newStudy, handleBack, handleSubmit }) {
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
    {
      name: "Locations",
      content: newStudy.locations.length ? (
        <LocationsList locations={newStudy.locations} />
      ) : (
        <Message
          title="No Locations"
          description="Locations are used when filtering for users trying to find studies near them and therefore adding locations improves their chances of finding your study"
          height="300px"
          showBackground
        >
          <Button
            onClick={() => {
              handleBack();
              handleBack();
              handleBack();
            }}
          >
            Add Locations
          </Button>
        </Message>
      ),
    },
    {
      name: "Questions",
      content: newStudy.questions.length ? (
        <QuestionsTable questions={newStudy.questions} />
      ) : (
        <Message
          title="No Questions"
          description="Questions are used to screen participants when signing up for your study and automatically assigns them an eligibility score based on their responses"
          height="300px"
          showBackground
        >
          <Button
            onClick={() => {
              handleBack();
              handleBack();
            }}
          >
            Add Questions
          </Button>
        </Message>
      ),
    },
    {
      name: "Resources",
      content: newStudy.resources.length ? (
        <ResourcesList resources={newStudy.resources} />
      ) : (
        <Message
          title="No Resources"
          description="Resources are any useful links relevant to the research study (like marketing material or external surveys) that need to be shared with participants"
          height="300px"
          showBackground
        >
          <Button
            onClick={() => {
              handleBack();
            }}
          >
            Add Resources
          </Button>
        </Message>
      ),
    },
  ];

  return (
    <CreateStudyWrapper
      title="Review"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
    >
      <HorizontalTabs tabs={tabs} useURL={false} paddingY="20px" />
      <WizardFormButton
        isFinalStep
        loading={loading}
        handleBack={handleBack}
        handleSubmit={handleSubmit}
      />
    </CreateStudyWrapper>
  );
}

export default Review;
