import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { StudiesContext } from "context";
import { Stack, Tag, TagLabel } from "@chakra-ui/react";

import Details from "./Details/Details";
import Screening from "./Screening/Screening";
import Review from "./Review/Review";

import StudyNotFound from "./StudyNotFound";

function CreateStudy() {
  const studies = useContext(StudiesContext);

  const [step, setStep] = useState(0);
  const [study, setStudy] = useState({
    title: "",
    description: "",

    sex: "",
    minAge: "",
    maxAge: "",
    control: "",

    questions: [],
    locations: [],
    conditions: [],
  });

  const { studyID } = useParams();

  useEffect(() => {
    const currentStudy = studies.find((study) => study.id === studyID);

    if (!currentStudy) return;
    if (currentStudy.published) history.push("/");

    setStudy({
      id: currentStudy.id,

      title: currentStudy.title,
      description: currentStudy.description,

      sex: currentStudy.sex,
      minAge: currentStudy.age.split("-")[0],
      maxAge: currentStudy.age.split("-")[1],
      acceptsHealthy: currentStudy.acceptsHealthy,

      questions: currentStudy.questions,
      locations: currentStudy.locations,
      conditions: currentStudy.conditions,
    });
  }, [studyID]);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const steps = [
    <Details key={0} study={study} handleBack={handleBack} handleNext={handleNext} />,
    <Screening key={1} study={study} handleBack={handleBack} handleNext={handleNext} />,
    <Review key={2} study={study} handleBack={handleBack} handleNext={handleNext} />,
  ];

  const STEPS = (
    <Stack spacing={2} mb="15px" isInline>
      {steps.map((t, i) => {
        const cursor = i <= step ? "pointer" : "not-allowed";
        const variant = i <= step ? "solid" : "outline";

        const handleSelectTab = () => {
          if (i < step) {
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
      {steps[step]}
    </>
  );
}

export default CreateStudy;
