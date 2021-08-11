import { useContext } from "react";
import MediaContext from "context/MediaContext";

import { Flex, Button, useColorModeValue } from "@chakra-ui/react";
import { Link } from "components";

import HeaderLogo from "./HeaderLogo";

function Header() {
  const { isPhone } = useContext(MediaContext);
  const background = useColorModeValue("white", "gray.900");

  return (
    <Flex
      justify="space-between"
      align="center"
      padding={isPhone ? "20px" : "20px 50px"}
      background={background}
      width="100%"
      boxShadow="sm"
      zIndex="100"
    >
      <Link to="/">
        <HeaderLogo />
      </Link>
      <Link to="/footer">
        <Button size={isPhone ? "sm" : "md"} colorScheme="blue">
          Start Free Trial
        </Button>
      </Link>
    </Flex>
  );
}

export default Header;
