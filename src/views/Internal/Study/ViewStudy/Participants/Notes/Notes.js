import { useState } from "react";

import { useParams } from "react-router-dom";
import { firestore } from "database/firebase";
import { useCollection } from "hooks";

import NotesItem from "./NotesItem";
import NotesForm from "./NotesForm";
import NotesNew from "./NotesNew";
import NotesError from "./NotesError";

import { Grid } from "@chakra-ui/react";
import { Loader } from "@studyfind/components";

function Notes({ id }) {
  const { studyID } = useParams();
  const [form, setForm] = useState(false);
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [errors, setErrors] = useState({ title: "", body: "" });
  const [notesID, setNotesID] = useState("");

  const notesRef = firestore
    .collection("studies")
    .doc(studyID)
    .collection("participants")
    .doc(id)
    .collection("notes");

  const [notes, loading, error] = useCollection(notesRef);

  const editNote = (note) => {
    setForm(true);
    setInputs(note);
    setNotesID(note.id);
  };

  const deleteNote = (note) => {
    notesRef.doc(note.id).delete();
  };

  const newNote = () => {
    setForm(true);
  };

  const handleCancel = () => {
    setForm(false);
    setNotesID("");
    setInputs({ title: "", body: "" });
    setErrors({ title: "", body: "" });
  };

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: !value });
  };

  const handleSubmit = () => {
    setErrors({
      title: !inputs.title,
      body: !inputs.body,
    });

    if (!inputs.title || !inputs.body) return;

    const data = {
      title: inputs.title,
      body: inputs.body,
      time: Date.now(),
    };

    if (!notesID) {
      notesRef.add(data);
    } else {
      notesRef.doc(notesID).update(data);
    }

    handleCancel();
  };

  if (loading) return <Loader />;
  if (error) return <NotesError />;

  return form ? (
    <NotesForm
      inputs={inputs}
      errors={errors}
      handleCancel={handleCancel}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  ) : (
    <Grid gap="15px">
      <NotesNew newNote={newNote} />
      {notes && notes.length
        ? notes.map((note) => (
            <NotesItem key={note.id} note={note} editNote={editNote} deleteNote={deleteNote} />
          ))
        : null}
    </Grid>
  );
}

export default Notes;
