import React from "react";
import styled from "styled-components";
import { Flex, Heading, Text, OrderedList, ListItem } from "@chakra-ui/react";

function Locations({ study }) {
  return study && study.locations && study.locations.length ? (
    <>
      <Head>
        <Heading fontSize="28px">Locations</Heading>
      </Head>
      <Flex direction="column" gridGap="10px" align="flex-start">
        <OrderedList>
          {study.locations.map((location, index) => {
            const address = `${location.localLocation.trim()}, ${location.nationalLocation.trim()}`;
            return (
              <ListItem key={index}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps?saddr=My+Location&daddr=${
                    address && address.trim().split(" ").join("+")
                  }`}
                >
                  <Text color="blue.500">{address}</Text>
                </a>
              </ListItem>
            );
          })}
        </OrderedList>
      </Flex>
    </>
  ) : null;
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  height: 40px;
`;

export default Locations;
