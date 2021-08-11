import { useContext } from "react";
import { useTabs } from "hooks";

import styled from "styled-components";
import { useDetectDevice } from "hooks";

import { Tabs, Tab, TabList, TabPanels } from "@chakra-ui/react";

/*
  tabs = [
    {
      name: string,
      link: string,
      content: ReactNodeList,
    }
  ]
*/

function HorizontalTabs({ tabs, ...rest }) {
  const [tabIndex, setTabIndex] = useTabs(tabs);

  const { isPhone } = useDetectDevice();

  return (
    <Tabs colorScheme="blue" height="100%" index={tabIndex}>
      <TabList overflowY={isPhone && "scroll"}>
        {tabs.map((t, i) => (
          <TabItem key={i} className="tab-item" onClick={() => setTabIndex(i)}>
            {t.name}
          </TabItem>
        ))}
      </TabList>
      <TabPanels {...rest}>{tabs[tabIndex].content}</TabPanels>
    </Tabs>
  );
}

const TabItem = styled(Tab)`
  font-weight: 600;
  color: rgb(161, 175, 192);
  display: flex;
  grid-gap: 8px;
  align-items: center;

  &:active {
    background: transparent !important;
    color: rgb(101, 115, 132);
  }

  &:focus {
    box-shadow: none !important;
  }
`;

export default HorizontalTabs;
