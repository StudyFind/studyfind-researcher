import { useState } from "react";
import { note as exampleNote } from "data";

import { useParams } from "react-router-dom";
// import { firestore } from "database/firebase";
// import { useCollection } from "hooks";

import { Loader } from "components";

import NotesView from "./NotesView";
import NotesEdit from "./NotesEdit";
import NotesError from "./NotesError";

function Notes({ id }) {
  const { studyID } = useParams();
  const [edit, setEdit] = useState(false);
  const [note, setNote] = useState(null);

  const notes = [exampleNote, exampleNote, exampleNote];
  const loading = false;
  const error = "";

  // const notesRef = firestore
  //   .collection("studies")
  //   .doc(studyID)
  //   .collection("participants")
  //   .doc(id)
  //   .collection("notes");

  // const [notes, loading, error] = useCollection(notesRef);

  const handleCreate = (newNote) => {
    // notesRef.add(newNote);
  };

  const handleUpdate = (id, updatedFields) => {
    // notesRef.doc(id).update(updatedFields);
  };

  const handleDelete = (id) => {
    // notesRef.doc(id).delete();
  };

  const handleEdit = (note) => {
    setEdit(true);
    note && setNote(note);
  };

  const handleCancel = () => {
    setEdit(false);
    setNote(null);
  };

  if (loading) return <Loader />;
  if (error) return <NotesError />;

  return edit ? (
    <NotesEdit
      note={note}
      handleCreate={handleCreate}
      handleUpdate={handleUpdate}
      handleCancel={handleCancel}
    />
  ) : (
    <NotesView
      notes={notes}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
}

export default Notes;
