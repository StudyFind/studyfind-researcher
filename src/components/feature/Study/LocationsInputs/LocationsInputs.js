import { SecondaryButton } from "components/simple/Buttons/SecondaryButton";
import { FaPlus, FaTrashAlt, FaUndo } from "react-icons/fa";

import { VStack, HStack } from "@chakra-ui/react";
import { EditorButton } from "components";

import LocationList from "./LocationList";

function LocationsInputs({
  inputs,
  errors,
  hasChanged,
  createLocation,
  updateLocation,
  deleteLocation,
  clearLocations,
  resetLocations,
  sortLocations,
}) {
  return (
    <VStack spacing="10px" align="stretch">
      <HStack>
        {hasChanged && (
          <EditorButton icon={<FaUndo />} onClick={resetLocations}>
            Undo Changes
          </EditorButton>
        )}
        {inputs.length && (
          <EditorButton
            color="red"
            icon={<FaTrashAlt />}
            onClick={clearLocations}
          >
            Delete All
          </EditorButton>
        )}
      </HStack>
      <LocationList
        inputs={inputs}
        errors={errors}
        updateLocation={updateLocation}
        deleteLocation={deleteLocation}
        onSortEnd={sortLocations}
      />
      <SecondaryButton leftIcon={<FaPlus />} onClick={createLocation}>
        Add Location
      </SecondaryButton>
    </VStack>
  );
}

export default LocationsInputs;
