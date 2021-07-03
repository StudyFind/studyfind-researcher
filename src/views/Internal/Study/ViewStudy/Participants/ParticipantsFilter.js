import styled from "styled-components";
import { TextInput, SelectInput } from "@studyfind/components";
import { Checkbox, FormLabel, Stack } from "@chakra-ui/react";

function ParticipantsFilter({ sort, setSort, status, setStatus, search, setSearch }) {
  return (
    <Filters>
      <Inputs>
        <SelectInput
          label="Sort by"
          value={sort}
          onChange={(_, value) => setSort(value)}
          options={["eligibility", "status"]}
        />
        <TextInput
          label="Search Participant"
          value={search}
          onChange={(_, value) => setSearch(value)}
        />
      </Inputs>
      <div>
        <FormLabel>Status</FormLabel>
        <Stack spacing={0}>
          {["interested", "screened", "consented", "rejected", "accepted"].map((name, i) => (
            <Checkbox
              key={i}
              isChecked={status[name]}
              onChange={(e) => setStatus({ ...status, [name]: e.target.checked })}
              textTransform="capitalize"
            >
              {name}
            </Checkbox>
          ))}
        </Stack>
      </div>
    </Filters>
  );
}

const Filters = styled.div`
  display: flex;
  margin: 15px 0;
  align-items: stretch;
  grid-gap: 20px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default ParticipantsFilter;
