import { OrderedList } from "@chakra-ui/react";
import Location from "./Location";

function Locations({ locations }) {
  return (
    <>
      <OrderedList>
        {locations.map((location) => (
          <Location location={location} />
        ))}
      </OrderedList>
    </>
  );
}

export default Locations;
