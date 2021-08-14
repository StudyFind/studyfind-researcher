import { Grid } from "@chakra-ui/react";
import { SortableContainer } from "react-sortable-hoc";

import LocationItem from "./LocationItem";

export default SortableContainer(
  ({ inputs, errors, updateLocation, deleteLocation }) => (
    <Grid gap="10px">
      {inputs.map((_, i) => (
        <LocationItem
          key={i}
          index={i}
          i={i}
          value={inputs[i]}
          error={errors[i]}
          updateLocation={updateLocation}
          deleteLocation={deleteLocation}
        />
      ))}
    </Grid>
  )
);
