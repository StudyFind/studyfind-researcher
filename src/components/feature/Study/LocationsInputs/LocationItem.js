import { Grid } from "@chakra-ui/react";
import { TextInput, ActionButton } from "components";
import { FaTrashAlt } from "react-icons/fa";
import { SortableElement } from "react-sortable-hoc";

import DragHandle from "./DragHandle";

export default SortableElement(
  ({ i, value, error, updateLocation, deleteLocation }) => (
    <Grid templateColumns="1fr 24fr 1fr" gridGap="10px" width="100%">
      <DragHandle />
      <TextInput
        placeholder="Location"
        name="prompt"
        value={value}
        error={error}
        onChange={() => updateLocation(i, value)}
      />
      <ActionButton
        color="red"
        size="md"
        hint="Delete Question"
        icon={<FaTrashAlt />}
        onClick={() => deleteLocation(i)}
      />
    </Grid>
  )
);
