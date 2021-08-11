import styled from "styled-components";

import { Link } from "components";
import { Flex, Heading, Image } from "@chakra-ui/react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

import SFLogo from "images/logo.png";

function SidebarLogo({ isPhone, active, setActive }) {
  const ToggleIcon = active ? FaAngleUp : FaAngleDown;

  const handleToggleActive = () => {
    if (isPhone) {
      setActive((prev) => !prev);
    }
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      padding="20px"
      onClick={handleToggleActive}
    >
      <LogoLink to="/" isWrapper>
        <Image height="1.75rem" marginRight="10px" src={SFLogo} />
        <Heading fontSize="1.5rem" color="white">
          StudyFind
        </Heading>
      </LogoLink>
      {isPhone && <ToggleIcon size="24px" color="white" />}
    </Flex>
  );
}

const LogoLink = styled(Link)`
  all: unset;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default SidebarLogo;
