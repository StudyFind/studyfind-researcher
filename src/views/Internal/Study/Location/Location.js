import React from "react";
import styled from "styled-components";

import { Heading, Tag, TagLabel } from "@chakra-ui/core";
import { FaLocationArrow } from "react-icons/fa";

function Location({ study, setEdit }) {
  return (
    <>
      <Head>
        <Heading fontSize="28px">Locations</Heading>
      </Head>
      <List>
        {study &&
          study.locations &&
          study.locations.map((location, index) => {
            const address = `${location.localLocation.trim()}, ${location.nationalLocation.trim()}`;
            return (
              <a
                key={index}
                target="_blank"
                rel="noreferrer"
                href={`https://www.google.com/maps?saddr=My+Location&daddr=${
                  address && address.trim().split(" ").join("+")
                }`}
              >
                <Tag leftIcon="check" key={index} color="blue.500">
                  <FaLocationArrow size="14px" />
                  <TagLabel ml="8px">{address}</TagLabel>
                </Tag>
              </a>
            );
          })}
      </List>
    </>
  );
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  align-items: flex-start;
`;

export default Location;
