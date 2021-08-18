import { compute } from "utils";

import { Grid, HStack, VStack } from "@chakra-ui/react";
import { TextareaInput } from "components";

import { EditorButton } from "components/simple/Buttons/EditorButton";
import { FaEraser, FaUndo } from "react-icons/fa";

import DescriptionAccessibilityScore from "../DescriptionAccessibilityScore/DescriptionAccessibilityScore";

function DetailsInputs({ values, errors, hasChanged, handleChange, handleReset, handleClear }) {
  return (
    <VStack spacing="10px" align="stretch">
      <HStack>
        {hasChanged && (
          <EditorButton icon={<FaUndo />} onClick={handleReset}>
            Undo Changes
          </EditorButton>
        )}
        {(values.title || values.description) && (
          <EditorButton color="purple" icon={<FaEraser />} onClick={handleClear}>
            Clear Text
          </EditorButton>
        )}
      </HStack>
      <Grid paddingY="10px" gap="10px">
        <TextareaInput
          label="Study Title"
          name="title"
          value={values.title}
          error={errors.title}
          limit={100}
          height="50px"
          onChange={handleChange}
        />
        <TextareaInput
          label="Study Description"
          name="description"
          value={values.description}
          error={errors.description}
          limit={500}
          height="128px"
          onChange={handleChange}
        />
        <DescriptionAccessibilityScore score={compute.readabilityIndex(values.description)} />
      </Grid>
    </VStack>
  );
}

export default DetailsInputs;
