import { useContext, useState } from "react";
import { useDetectDevice } from "hooks";

import { Flex, useColorModeValue } from "@chakra-ui/react";

import SidebarLogo from "./SidebarLogo";
import SidebarLinks from "./SidebarLinks";
import SidebarUser from "./SidebarUser";

function Sidebar({ name, email, links, ...rest }) {
  const [active, setActive] = useState(false);

  const { isPhone } = useDetectDevice();

  const background = useColorModeValue("blue.900", "gray.900");

  return (
    <Flex
      direction="column"
      width={isPhone ? "100%" : "280px"}
      h={(!isPhone || active) && "100vh"}
      background={background}
      {...rest}
    >
      <SidebarLogo isPhone={isPhone} active={active} setActive={setActive} />
      {(!isPhone || active) && (
        <>
          <SidebarLinks links={links} />
          <SidebarUser name={name} email={email} />
        </>
      )}
    </Flex>
  );
}

export default Sidebar;
