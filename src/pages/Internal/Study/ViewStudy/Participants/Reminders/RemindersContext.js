import { useState, createContext } from "react";
import { usePagination } from "hooks";
import { useParams } from "react-router-dom";
import { auth, firestore } from "database/firebase";

import { Loader, Message } from "components";

export const RemindersContext = createContext();

export const RemindersProvider = ({ children }) => {
  const researcherID = auth.currentUser.uid;

  // NOTE SELECTED TO EDIT
  const [selectedReminder, setSelectedReminder] = useState(null);

  // LOADING STATES
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { studyID, participantID } = useParams();

  const remindersRef = firestore.collection("reminders");

  const remindersQuery = remindersRef
    .where("studyID", "==", studyID || "")
    .where("researcherID", "==", researcherID || "")
    .where("participantID", "==", participantID || "");

  const {
    documents: reminders,
    loading: isFetching,
    loadingMore: isFetchingMore,
    handleLoadMore: handleFetchMore,
    fetchedAll: hasFetchedAll,
    error,
  } = usePagination(remindersQuery, 10);

  const createReminder = ({ title, times, startDate, endDate }) => {
    setIsCreating(true);
    return remindersRef
      .add({
        title,
        times,
        startDate,
        endDate,
        studyID,
        researcherID,
        participantID,
        confirmedByParticipant: false,
      })
      .then(() => setIsCreating(false));
  };

  const updateReminder = (reminderID, { title, times, startDate, endDate }) => {
    setIsUpdating(true);
    return remindersRef
      .doc(reminderID)
      .update({ title, times, startDate, endDate })
      .then(() => setIsUpdating(false));
  };

  const deleteReminder = (reminderID) => {
    setIsDeleting(true);
    return remindersRef
      .doc(reminderID)
      .delete()
      .then(() => setIsDeleting(false));
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = (reminder) => {
    setIsEditing(true);
    setSelectedReminder(reminder || null);
  };

  const handleDelete = (reminder) => {
    deleteReminder(reminder.id);
  };

  const handleSave = (data) => {
    const promise = selectedReminder
      ? updateReminder(selectedReminder.id, data)
      : createReminder(data);
    promise.then(() => setIsEditing(false));
  };

  if (isFetching) return <Loader height="calc(100vh - 80px)" />;

  if (error) {
    return (
      <Message
        status="failure"
        title="Connection Error"
        description="We could not load your reminders"
      />
    );
  }

  return (
    <RemindersContext.Provider
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
        selectedReminder,
        reminders,
        error,
      }}
    >
      {children}
    </RemindersContext.Provider>
  );
};
