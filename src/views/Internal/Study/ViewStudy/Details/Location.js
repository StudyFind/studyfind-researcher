import React from "react";
import styled from "styled-components";

import { Heading, Tag, TagLabel, Box } from "components";
import { CheckIcon } from "@chakra-ui/icons";
import { FaLocationArrow } from "react-icons/fa";

function Location({ study }) {
  return study && study.locations && study.locations.length ? (
    <Box py="20px">
      <Heading fontSize="20px">Locations</Heading>
      <List>
        {study.locations.map((location, index) => {
          const address = `${location.localLocation.trim()}, ${location.nationalLocation.trim()}`;
          return (
            <a
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.google.com/maps?saddr=My+Location&daddr=${
                address && address.trim().split(" ").join("+")
              }`}
            >
              <Tag leftIcon={<CheckIcon />} key={index} color="blue.500">
                <FaLocationArrow size="14px" />
                <TagLabel ml="8px">{address}</TagLabel>
              </Tag>
            </a>
          );
        })}
      </List>
    </Box>
  ) : null;
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  align-items: flex-start;
`;

export default Location;
