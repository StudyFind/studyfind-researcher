import React from "react";
import { Flex, Heading, Text, OrderedList, ListItem } from "@chakra-ui/react";

function Locations({ study }) {
  return study && study.locations && study.locations.length ? (
    <>
      <Flex justify="space-between" align="center" my="15px" h="40px">
        <Heading fontSize="28px">Locations</Heading>
      </Flex>
      <Flex direction="column" align="flex-start">
        <OrderedList>
          {study.locations.map((location, index) => {
            const address = `${location.localLocation.trim()}, ${location.nationalLocation.trim()}`;
            return (
              <ListItem key={index} my="4px">
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

export default Locations;
