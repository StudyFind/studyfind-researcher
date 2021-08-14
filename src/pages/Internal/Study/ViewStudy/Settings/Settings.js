import { VStack } from "@chakra-ui/react";
import { Card } from "components";

import Activate from "./Activate";
import Share from "./Share";
import Delete from "./Delete";

import TabHeader from "../TabHeader";

function Settings({ study }) {
  const settings = [
    {
      condition: true,
      component: <Activate study={study} />,
    },
    {
      condition: study.activated,
      component: <Share study={study} />,
    },
    {
      condition: true,
      component: <Delete study={study} />,
    },
  ];

  return (
    <>
      <TabHeader heading="Settings" />
      <VStack spacing="10px" align="stretch">
        {settings.map(
          ({ condition, component }, i) =>
            condition && <Card key={i}>{component}</Card>
        )}
      </VStack>
    </>
  );
}

export default Settings;
