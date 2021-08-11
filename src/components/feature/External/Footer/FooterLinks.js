import { ButtonGroup, IconButton, useColorModeValue } from "@chakra-ui/react";
import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "components";

function FooterLinks() {
  const color = useColorModeValue("gray.700", "gray.200");

  return (
    <ButtonGroup variant="ghost" color="gray.600">
      <Link to="https://google.com">
        <IconButton icon={<FaLinkedin />} color={color} fontSize="20px" />
      </Link>
      <Link to="https://google.com">
        <IconButton icon={<FaInstagram />} color={color} fontSize="20px" />
      </Link>
      <Link to="https://google.com">
        <IconButton icon={<FaFacebookSquare />} color={color} fontSize="20px" />
      </Link>
    </ButtonGroup>
  );
}

export default FooterLinks;
