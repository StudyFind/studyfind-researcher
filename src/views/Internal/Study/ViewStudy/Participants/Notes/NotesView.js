import { Grid } from "@chakra-ui/react";
import { NewButton } from "molecules";

import NotesItem from "./NotesItem";

function NotesView({ notes, handleDelete, handleEdit }) {
  return (
    <Grid gap="15px">
      <NewButton onClick={() => handleEdit()}>New Note</NewButton>
      {notes?.map((note) => (
        <NotesItem key={note.id} note={note} handleDelete={handleDelete} handleEdit={handleEdit} />
      ))}
    </Grid>
  );
}

export default NotesView;
