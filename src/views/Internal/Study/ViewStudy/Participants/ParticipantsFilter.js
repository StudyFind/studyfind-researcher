import React from "react";
import styled from "styled-components";
import { Input, Select } from "components";
import { Checkbox, CheckboxGroup, FormLabel, Stack } from "@chakra-ui/react";

function ParticipantsFilter({ sort, setSort, status, setStatus, search, setSearch, updateStatus }) {
  return (
    <Filters>
      <Inputs>
        <Select
          label="Sort by"
          value={sort}
          onChange={(_, value) => setSort(value)}
          options={["fakename", "eligibility", "status"]}
        />
        <Input
          label="Search Participant"
          value={search}
          onChange={(_, value) => setSearch(value)}
        />
      </Inputs>
      <div>
        <FormLabel>Status</FormLabel>
        <Stack spacing={0}>
          {status.map((value, index) => (
            <Checkbox
              key={index}
              isChecked={value.checked}
              onChange={(e) =>
                updateStatus(
                  {
                    name: value.name,
                    checked: e.target.checked,
                  },
                  index
                )
              }
              textTransform="capitalize"
            >
              {value.name}
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
