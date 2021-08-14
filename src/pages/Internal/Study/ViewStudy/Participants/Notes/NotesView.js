import { Grid } from "@chakra-ui/react";
import { NewCardButton } from "components";

import NoteCard from "components/feature/NoteCard/NoteCard";

function NotesView({ notes, handleDelete, handleEdit }) {
  return (
    <Grid gap="15px" padding="20px">
      <NewCardButton onClick={() => handleEdit()}>New Note</NewCardButton>
      {notes?.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </Grid>
  );
}

export default NotesView;
