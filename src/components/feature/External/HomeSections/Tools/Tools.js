import { SimpleGrid } from "@chakra-ui/react";
import { useColor, useDetectDevice } from "hooks";

import SectionWrapper from "../SectionWrapper";
import Tool from "./Tool";

function Tools({ tools }) {
  const background = useColor("white");
  const { isPhone } = useDetectDevice();

  return (
    <SectionWrapper background={background} maxWidth="100%" minHeight="100%">
      <SimpleGrid
        columns={isPhone ? 1 : 3}
        justifyItems="space-between"
        gap="120px"
      >
        {tools.map((tool, i) => (
          <Tool
            key={i}
            icon={tool.icon}
            title={tool.title}
            description={tool.description}
          />
        ))}
      </SimpleGrid>
    </SectionWrapper>
  );
}

export default Tools;
