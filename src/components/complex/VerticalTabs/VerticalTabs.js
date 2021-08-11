import { useContext } from "react";
import { useTabs } from "hooks";

import { useDetectDevice } from "hooks";

import { Flex, Grid } from "@chakra-ui/react";
import VerticalTabItem from "./VerticalTabItem";
/*
  tabs = [
    {
      name: string,
      link: string,
      content: ReactNodeList,
    }
  ]
*/

function VerticalTabs({ tabs, ...rest }) {
  const [tabIndex, setTabIndex] = useTabs(tabs);
  const { isPhone } = useDetectDevice();

  return (
    <Flex direction={isPhone ? "column" : "row"} align={isPhone || "flex-start"}>
      <Grid gap="10px" marginBottom={isPhone ? "30px" : "0"} width={isPhone ? "100%" : "180px"}>
        {tabs.map((t, i) => (
          <VerticalTabItem
            key={i}
            name={t.name}
            icon={t.icon}
            selected={tabIndex === i}
            onClick={() => setTabIndex(i)}
          />
        ))}
      </Grid>
      <Flex {...rest}>{tabs[tabIndex].content}</Flex>
    </Flex>
  );
}

export default VerticalTabs;
