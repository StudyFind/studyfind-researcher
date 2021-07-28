import { useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import { StudiesContext } from "context";
import { Stack, Tag, TagLabel } from "@chakra-ui/react";

import Details from "./Details/Details";
import Screening from "./Screening/Screening";
import Review from "./Review/Review";

import StudyNotFound from "./StudyNotFound";

function CreateStudy() {
  const { studyID, tab } = useParams();

  const history = useHistory();

  const tabs = ["details", "screening", "review"];
  const currentIndex = tabs.indexOf(tab);

  const studies = useContext(StudiesContext);
  const study = studies.find((study) => study.id === studyID);

  useEffect(() => {
    // redirect to main page to prevent changes being made to published study
    // since researcher are not allowed to change study details and screening
    if (study?.published) {
      history.push("/");
    }
  }, []);

  const getBackTab = () => {
    if (currentIndex > 0) {
      return tabs[currentIndex - 1];
    }

    return "/fetch";
  };

  const getNextTab = () => {
    if (currentIndex < tabs.length - 1) {
      return tabs[currentIndex + 1];
    }

    const welcomeLink = "/welcome";
    const studyLink = `/study/${study?.id}/details`;

    // checks where the user came from and redirects them back to the
    // appropriate page on completing the study creation process
    const { searchParams } = new URL(window.location);
    const redirectedFrom = searchParams.get("from");

    return redirectedFrom === "welcome" ? welcomeLink : studyLink;
  };

  const handleNext = () => {
    const nextTab = getNextTab();
    history.push(nextTab);
  };

  const handleBack = () => {
    const backTab = getBackTab();
    history.push(backTab);
  };

  const render = {
    details: <Details study={study} handleBack={handleBack} handleNext={handleNext} />,
    screening: <Screening study={study} handleBack={handleBack} handleNext={handleNext} />,
    review: <Review study={study} handleBack={handleBack} handleNext={handleNext} />,
  };

  const STEPS = (
    <Stack spacing={2} mb="15px" isInline>
      {tabs.map((t, i) => {
        const cursor = i <= currentIndex ? "pointer" : "not-allowed";
        const variant = i <= currentIndex ? "solid" : "outline";

        const handleSelectTab = () => {
          if (i < currentIndex) {
            history.push(t);
          }
        };

        return (
          <Tag
            key={i}
            h="24px"
            w="24px"
            rounded="full"
            cursor={cursor}
            variant={variant}
            onClick={handleSelectTab}
            colorScheme="blue"
          >
            <TagLabel>{i + 1}</TagLabel>
          </Tag>
        );
      })}
    </Stack>
  );

  if (!study) {
    <StudyNotFound studyID={studyID} />;
  }

  return (
    <>
      {STEPS}
      {render[tab]}
    </>
  );
}

export default CreateStudy;
