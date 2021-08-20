import { Grid } from "@chakra-ui/react";
import { ActionButton, SelectInput, TextInput } from "components";
import { FaTrashAlt } from "react-icons/fa";
import { SortableElement } from "react-sortable-hoc";

import DragHandle from "./DragHandle";

export default SortableElement(({ i, value, error, updateQuestion, deleteQuestion }) => (
  <Grid templateColumns="1fr 6fr 18fr 1fr" gridGap="10px" width="100%">
    <DragHandle />
    <SelectInput
      name="type"
      value={value.type}
      error={error.type}
      onChange={(name, value) => updateQuestion(i, name, value)}
      options={[
        { label: "Inclusion", value: "Inclusion" },
        { label: "Exclusion", value: "Exclusion" },
      ]}
    />
    <TextInput
      placeholder="Question Prompt"
      name="prompt"
      value={value.prompt}
      error={error.prompt}
      onChange={(name, value) => updateQuestion(i, name, value)}
    />
    <ActionButton
      colorScheme="red"
      size="md"
      hint="Delete Question"
      icon={<FaTrashAlt />}
      onClick={() => deleteQuestion(i)}
    />
  </Grid>
));
