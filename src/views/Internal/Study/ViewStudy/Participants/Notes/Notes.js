import React, { useState } from "react";

import NotesList from "./NotesList";
import NotesNew from "./NotesNew";

function Notes({ id, notes }) {
  const [add, setAdd] = useState(false);
  return add ? <NotesNew id={id} setAdd={setAdd} /> : <NotesList notes={notes} setAdd={setAdd} />;
}

export default Notes;
