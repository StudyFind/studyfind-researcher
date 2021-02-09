import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Stack, Tag, TagLabel } from "@chakra-ui/react";

import Details from "./Details/Details";
import Eligibility from "./Eligibility/Eligibility";
import Consent from "./Consent/Consent";
import Review from "./Review/Review";

function CreateStudy({ studies }) {
  const history = useHistory();
  const [redirect, setRedirect] = useState();

  const { nctID, tab } = useParams();
  const tabs = ["details", "eligibility", "consent", "review"];
  const study = studies.find((study) => study.id === nctID) || {};

  useEffect(() => {
    const params = new URL(window.location).searchParams;
    const from = params.get("from");
    setRedirect(from === "welcome" ? "/welcome" : "/dashboard");
  }, []);

  const next = () => {
    const index = tabs.indexOf(tab);
    const nextTab = tabs[index + 1];
    history.push(index === tabs.length - 1 ? redirect : nextTab);
  };

  const render = {
    details: <Details study={study} next={next} />,
    eligibility: <Eligibility study={study} next={next} />,
    consent: <Consent study={study} next={next} />,
    review: <Review study={study} next={next} />,
  };

  const steps = (
    <Stack spacing={2} mb="15px" isInline>
      {tabs.map((t, i) => (
        <Tag
          key={i}
          h="24px"
          w="24px"
          rounded="full"
          variant={t === tab ? "solid" : "outline"}
          colorScheme="blue"
        >
          <TagLabel>{i + 1}</TagLabel>
        </Tag>
      ))}
    </Stack>
  );

  return (
    <>
      {["published", "deleted"].includes(tab) || steps}
      {render[tab]}
    </>
  );
}

export default CreateStudy;
