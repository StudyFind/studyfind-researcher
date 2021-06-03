import { List } from "components";
import { Flex, Heading } from "@chakra-ui/react";

import Publish from "./Publish";
import Activate from "./Activate";
import Share from "./Share";
import Delete from "./Delete";
import Update from "./Update";

function Settings({ study }) {
  const settings = [
    {
      condition: study.published,
      component: <Activate study={study} />,
    },
    {
      condition: study.activated,
      component: <Share study={study} />,
    },
    {
      condition: !study.published,
      component: <Publish study={study} />,
    },
    {
      condition: true,
      component: <Update study={study} />,
    },
    {
      condition: true,
      component: <Delete study={study} />,
    },
  ];

  return (
    <>
      <Flex justify="space-between" align="center" my="15px" height="40px">
        <Heading fontSize="28px">Settings</Heading>
      </Flex>
      <List>
        {settings.map(
          ({ condition, component }, i) => condition && <List.Row key={i}>{component}</List.Row>
        )}
      </List>
    </>
  );
}

export default Settings;
