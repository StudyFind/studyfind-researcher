import React, { useState } from "react";
import { useCollection } from "hooks";
import NotesList from "./NotesList";
import NotesNew from "./NotesNew";
import { firestore } from "database/firebase";
import { useParams } from "react-router-dom";

function Notes({ id }) {
  const [add, setAdd] = useState(false);
  const { nctID } = useParams();
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [errors, setErrors] = useState({ title: "", body: "" });
  const [notesID, setNotesID] = useState("");
  const [notes] = useCollection(
    firestore
      .collection("studies")
      .doc(nctID)
      .collection("participants")
      .doc(id)
      .collection("notes")
  );
  return add ? (
    <NotesNew
      id={id}
      setAdd={setAdd}
      inputs={inputs}
      setInputs={setInputs}
      errors={errors}
      setErrors={setErrors}
      notesID={notesID}
      setNotesID={setNotesID}
    />
  ) : (
    <NotesList
      id={id}
      notes={notes}
      setAdd={setAdd}
      inputs={inputs}
      setInputs={setInputs}
      setNotesID={setNotesID}
    />
  );
}

export default Notes;
