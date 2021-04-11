import React, { useState, useEffect, useContext } from "react";
import { StudiesContext } from "context";
import { useParams, useHistory } from "react-router-dom";
import { Stack, Tag, TagLabel } from "@chakra-ui/react";
import { Message } from "components";

import Details from "./Details/Details";
import Screening from "./Screening/Screening";
import Review from "./Review/Review";

function CreateStudy() {
  const studies = useContext(StudiesContext);
  const { nctID, tab } = useParams();
  const study = studies.find((study) => study.id === nctID);
  const history = useHistory();
  const [redirect, setRedirect] = useState();

  const tabs = ["details", "screening", "review"];

  useEffect(() => {
    if (study && study.published) history.push("/"); // redirect to main page to prevent changes being made to published study (since researcher are not allowed to change study details and screening)
    const params = new URL(window.location).searchParams;
    const from = params.get("from");
    setRedirect(from === "welcome" ? "/welcome" : `/study/${nctID}`);
  }, []);

  const back = () => {
    const index = tabs.indexOf(tab);
    const backTab = tabs[index - 1];
    history.push(index === 0 ? "/fetch" : backTab);
  };

  const next = () => {
    const index = tabs.indexOf(tab);
    const nextTab = tabs[index + 1];
    history.push(index === tabs.length - 1 ? redirect : nextTab);
  };

  const render = {
    details: <Details study={study} next={next} back={back} />,
    screening: <Screening study={study} next={next} back={back} />,
    review: <Review study={study} next={next} back={back} />,
  };

  const steps = (
    <Stack spacing={2} mb="15px" isInline>
      {tabs.map((t, i) => (
        <Tag
          key={i}
          h="24px"
          w="24px"
          rounded="full"
          cursor={i <= tabs.indexOf(tab) ? "pointer" : "not-allowed"}
          variant={i <= tabs.indexOf(tab) ? "solid" : "outline"}
          onClick={i <= tabs.indexOf(tab) ? () => history.push(t) : () => {}}
          colorScheme="blue"
        >
          <TagLabel>{i + 1}</TagLabel>
        </Tag>
      ))}
    </Stack>
  );

  const BODY = (
    <>
      {steps}
      {render[tab]}
    </>
  );

  const MISSING = (
    <Message
      status="failure"
      title="Study not found!"
      description={`The study ${nctID} could not be found in the StudyFind database. Please
  ensure that it has been successfully created by following all directions in the study
  creation process.`}
    />
  );

  return study ? BODY : MISSING;
}

export default CreateStudy;
