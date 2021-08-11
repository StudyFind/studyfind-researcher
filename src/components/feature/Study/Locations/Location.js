import { ListItem, Text } from "@chakra-ui/react";
import { Link } from "components";

function Location({ location }) {
  const getGoogleMapsLink = (location) => {
    const initial = "https://www.google.com/maps?saddr=My+Location&daddr=";
    const cleaned = location.trim().split(" ").join("+");
    return initial + cleaned;
  };

  return (
    <ListItem marginY="4px">
      <Link to={getGoogleMapsLink(location)}>
        <Text color="blue.500">{location}</Text>
      </Link>
    </ListItem>
  );
}

export default Location;
