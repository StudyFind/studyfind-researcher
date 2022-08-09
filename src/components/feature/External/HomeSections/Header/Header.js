import { useState, useEffect } from "react";
import { useColor, useDetectDevice } from "hooks";
import { useWindowScroll, useWindowSize } from "react-use";
import { Flex, Button, Text } from "@chakra-ui/react";
import { Link } from "components";

import HeaderLogo from "./HeaderLogo";

function Header({ logoLink, buttonText, buttonLink }) {
  const [active, setActive] = useState(false);

  const { y } = useWindowScroll();
  const { height } = useWindowSize();

  useEffect(() => {
    setActive(y > height);
  }, [y, height]);

  const { isPhone } = useDetectDevice();
  const background = useColor("white", "gray.900");

  const borderColor = useColor("gray.200", "gray.700");

  if (!active) {
    return null;
  }

  const links = [
    { link: "https://studyfind.org/", title: "Participant" },
    { link: "/team", title: "Our Team" },
  ];

  const navLinkItems = links.map((item) => (
    <Link
      key={item.title}
      to={item.link}
      style={{ textDecoration: "none" }}
      onClick={() => window.scrollTo({ top: 0 })}
    >
      <Text
        color="blue.500"
        fontWeight="400"
        _hover={{ transform: "scale(1.05)", textDecoration: "none" }}
      >
        {item.title}
      </Text>
    </Link>
  ));

  return (
    <Flex
      top="0"
      position="fixed"
      justify="space-between"
      align="center"
      padding={isPhone ? "20px" : "20px 50px"}
      background={background}
      width="100%"
      boxShadow="sm"
      zIndex="400"
      borderBottomWidth="1px"
      borderBottomColor={borderColor}
      gridGap="10px"
    >
      <Flex
        minWidth="max-content"
        justify="space-between"
        gridGap="5px"
        alignItems="center"
      >
        <Link to={logoLink}>
          <HeaderLogo />
        </Link>
      </Flex>
      <Flex
        align="center"
        justify="space-between"
        gridGap="20px"
        minWidth="max-content"
      >
        {navLinkItems}
        <Link to={buttonLink}>
          <Button size={isPhone ? "sm" : "md"} colorScheme="blue">
            {buttonText}
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}

export default Header;
