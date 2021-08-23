import { useContext } from "react";

import { MeetingsContext } from "./MeetingsContext";

import { Grid } from "@chakra-ui/react";
import { LoadMoreButton, NewCardButton } from "components";

import MeetingCard from "components/feature/MeetingCard/MeetingCard";

function MeetingsView() {
  const { meetings, hasFetchedAll, isFetchingMore, handleFetchMore, handleDelete, handleEdit } =
    useContext(MeetingsContext);

  return (
    <Grid gap="15px" padding="20px" alignItems="center">
      <NewCardButton onClick={() => handleEdit()}>New Meeting</NewCardButton>
      {meetings?.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          meeting={meeting}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
      <LoadMoreButton
        fetchedAll={hasFetchedAll}
        isLoading={isFetchingMore}
        onClick={handleFetchMore}
      />
    </Grid>
  );
}

export default MeetingsView;
