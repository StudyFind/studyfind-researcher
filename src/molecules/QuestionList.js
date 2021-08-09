import { Grid } from "@chakra-ui/react";
import { SortableContainer } from "react-sortable-hoc";

import QuestionItem from "./QuestionItem";

export default SortableContainer(({ inputs, errors, updateQuestion, deleteQuestion }) => (
  <Grid gap="10px">
    {inputs.map((_, i) => (
      <QuestionItem
        key={i}
        index={i}
        i={i}
        value={inputs[i]}
        error={errors[i]}
        updateQuestion={updateQuestion}
        deleteQuestion={deleteQuestion}
      />
    ))}
  </Grid>
));
