import { Flex, Heading, Text, OrderedList, ListItem, Box } from "@chakra-ui/react";
import { Message, Link } from "@studyfind/components";

function Locations({ study }) {
  const getAddress = (location) => {
    return `${location.localLocation.trim()}, ${location.nationalLocation.trim()}`;
  };

  const getGoogleMapsLink = (location) => {
    const address = getAddress(location);
    const initial = "https://www.google.com/maps?saddr=My+Location&daddr=";
    const cleaned = address.trim().split(" ").join("+");
    return initial + cleaned;
  };

  return study?.locations?.length ? (
    <>
      <Flex justify="space-between" align="center" my="15px" h="40px">
        <Heading fontSize="28px">Locations</Heading>
      </Flex>
      <Flex direction="column" align="flex-start">
        <OrderedList>
          {study.locations.map((location, i) => (
            <ListItem key={i} my="4px">
              <Link to={getGoogleMapsLink(location)}>
                <Text color="blue.500">{getAddress(location)}</Text>
              </Link>
            </ListItem>
          ))}
        </OrderedList>
      </Flex>
    </>
  ) : (
    <Box h="500px">
      <Message
        status="failure"
        title="No locations"
        description="Your study does not have any locations listed!"
      />
    </Box>
  );
}

export default Locations;
