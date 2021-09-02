import moment from "moment";

import { useState, createContext } from "react";
import { usePagination } from "hooks";
import { useParams } from "react-router-dom";
import { firestore } from "database/firebase";

import { Loader, Message } from "components";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  // NOTE SELECTED TO EDIT
  const [selectedNote, setSelectedNote] = useState(null);

  // LOADING STATES
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { studyID, participantID } = useParams();

  const notesRef = firestore
    .collection("studies")
    .doc(studyID)
    .collection("participants")
    .doc(participantID)
    .collection("notes");

  const notesQuery = notesRef.orderBy("time", "desc");

  const {
    documents: notes,
    loading: isFetching,
    loadingMore: isFetchingMore,
    handleLoadMore: handleFetchMore,
    fetchedAll: hasFetchedAll,
    error,
  } = usePagination(notesQuery, 10);

  const createNote = ({ title, body }) => {
    setIsCreating(true);
    return notesRef
      .add({ title, body, time: moment().utc().valueOf() })
      .then(() => setIsCreating(false));
  };

  const updateNote = (noteID, { title, body }) => {
    setIsUpdating(true);
    return notesRef
      .doc(noteID)
      .update({ title, body })
      .then(() => setIsUpdating(false));
  };

  const deleteNote = (noteID) => {
    setIsDeleting(true);
    return notesRef
      .doc(noteID)
      .delete()
      .then(() => setIsDeleting(false));
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = (note) => {
    setIsEditing(true);
    setSelectedNote(note || null);
  };

  const handleDelete = (note) => {
    deleteNote(note.id);
  };

  const handleSave = (data) => {
    const promise = selectedNote ? updateNote(selectedNote.id, data) : createNote(data);
    promise.then(() => setIsEditing(false));
  };

  if (isFetching) return <Loader height="calc(100vh - 80px)" />;

  if (error) {
    return (
      <Message
        status="failure"
        title="Connection Error"
        description="We could not load your notes"
      />
    );
  }

  return (
    <NotesContext.Provider
      value={{
        isEditing,
        isCreating,
        isUpdating,
        isDeleting,
        isFetchingMore,
        handleSave,
        handleEdit,
        handleDelete,
        handleCancel,
        handleFetchMore,
        hasFetchedAll,
        selectedNote,
        notes,
        error,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
