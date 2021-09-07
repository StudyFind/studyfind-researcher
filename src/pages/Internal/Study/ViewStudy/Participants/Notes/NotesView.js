import { useContext } from "react";
import { NotesContext } from "./NotesContext";

import { Grid } from "@chakra-ui/react";
import { LoadMoreButton, NewCardButton } from "components";

import NoteCard from "components/feature/Participants/NoteCard/NoteCard";

function NotesView() {
  const {
    notes,
    hasFetchedAll,
    isFetchingMore,
    handleFetchMore,
    handleDelete,
    handleEdit,
  } = useContext(NotesContext);

  return (
    <Grid gap="15px" padding="20px" alignItems="center">
      <NewCardButton onClick={() => handleEdit()}>New Note</NewCardButton>
      {notes?.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          handleEdit={() => handleEdit(note)}
          handleDelete={() => handleDelete(note)}
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

export default NotesView;
