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
  const goToEdit = (note) => {
    setInputs({ title: note.title, body: note.body });
    setNotesID(note.id);
    setAdd(true);
  };
  const deleteNote = (note) => {
    firestore
      .collection("studies")
      .doc(nctID)
      .collection("participants")
      .doc(id)
      .collection("notes")
      .doc(note.id)
      .delete();
  };
  const newNote = () => {
    setAdd(true);
  };
  const cancelNewNote = () => {
    setAdd(false);
    setNotesID("");
    setInputs({ title: "", body: "" });
    setErrors({ title: "", body: "" });
  };
  const handleNoteChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: !value });
  };
  const validateNote = ({ title, body }) => ({
    title: !title,
    body: !body,
  });
  const handleSubmit = () => {
    const err = validateNote(inputs);
    setErrors(err);
    const errorExists = Object.keys(err).some((i) => err[i]);
    if (errorExists) return;
    if (!notesID) {
      firestore
        .collection("studies")
        .doc(nctID)
        .collection("participants")
        .doc(id)
        .collection("notes")
        .add({
          title: inputs.title,
          body: inputs.body,
          time: Date.now(),
        });
    } else {
      firestore
        .collection("studies")
        .doc(nctID)
        .collection("participants")
        .doc(id)
        .collection("notes")
        .doc(notesID)
        .update({
          title: inputs.title,
          body: inputs.body,
          time: Date.now(),
        });
    }
    setAdd(false);
    setNotesID("");
    setInputs({ title: "", body: "" });
    setErrors({ title: "", body: "" });
  };

  return add ? (
    <NotesNew
      inputs={inputs}
      errors={errors}
      cancelNewNote={cancelNewNote}
      handleNoteChange={handleNoteChange}
      handleSubmit={handleSubmit}
    />
  ) : (
    <NotesList
      notes={notes}
      goToEdit={goToEdit}
      newNote={newNote}
      deleteNote={deleteNote}
    />
  );
}

export default Notes;
