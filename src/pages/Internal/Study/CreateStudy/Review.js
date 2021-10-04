import { auth } from "database/firebase";

import HorizontalTabs from "components/complex/HorizontalTabs/HorizontalTabs";
import StudyCardLarge from "components/feature/Study/StudyCard/StudyCardLarge";
import LocationsList from "components/feature/Study/LocationsView/LocationsList";
import LocationsEmpty from "components/feature/Study/LocationsView/LocationsEmpty";
import QuestionsTable from "components/feature/Study/QuestionsView/QuestionsTable";
import QuestionsEmpty from "components/feature/Study/QuestionsView/QuestionsEmpty";
import ResourcesList from "components/feature/Study/ResourcesView/ResourcesList";
import ResourcesEmpty from "components/feature/Study/ResourcesView/ResourcesEmpty";

function Review({ study, Wrapper, goBack }) {
  const title = "Review";
  const description =
    'Please check that the details of the study match what you would like to present to potential participants and click "Done" to complete the study creation process. You will be able to change all the information even after the study has been created.';

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
        <LocationsEmpty onButtonClick={() => goBack(3)} />
      ),
    },
    {
      name: "Questions",
      content: study.questions.length ? (
        <QuestionsTable questions={study.questions} />
      ) : (
        <QuestionsEmpty onButtonClick={() => goBack(2)} />
      ),
    },
    {
      name: "Resources",
      content: study.resources.length ? (
        <ResourcesList resources={study.resources} />
      ) : (
        <ResourcesEmpty onButtonClick={() => goBack(1)} />
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
