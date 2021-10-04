import { useState, createContext } from "react";
import { usePagination } from "hooks";
import { useParams } from "react-router-dom";
import { auth, firestore } from "database/firebase";

import { Loader, Message } from "components";

export const MeetingsContext = createContext();

export const MeetingsProvider = ({ children }) => {
  const researcherID = auth.currentUser.uid;

  // NOTE SELECTED TO EDIT
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  // LOADING STATES
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { studyID, participantID } = useParams();

  const meetingsRef = firestore.collection("meetings");

  const meetingsQuery = meetingsRef
    .where("studyID", "==", studyID || "")
    .where("researcherID", "==", researcherID || "")
    .where("participantID", "==", participantID || "");

  const {
    documents: meetings,
    loading: isFetching,
    loadingMore: isFetchingMore,
    handleLoadMore: handleFetchMore,
    fetchedAll: hasFetchedAll,
    error,
  } = usePagination(meetingsQuery, 10);

  const createMeeting = ({ name, link, time }) => {
    setIsCreating(true);
    return meetingsRef
      .add({
        name,
        link,
        time,
        studyID,
        researcherID,
        participantID,
        confirmedByParticipant: false,
      })
      .then(() => setIsCreating(false));
  };

  const updateMeeting = (meetingID, { name, link, time }) => {
    setIsUpdating(true);
    return meetingsRef
      .doc(meetingID)
      .update({ name, link, time })
      .then(() => setIsUpdating(false));
  };

  const deleteMeeting = (meetingID) => {
    setIsDeleting(true);
    return meetingsRef
      .doc(meetingID)
      .delete()
      .then(() => setIsDeleting(false));
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = (meeting) => {
    setIsEditing(true);
    setSelectedMeeting(meeting || null);
  };

  const handleDelete = (meeting) => {
    deleteMeeting(meeting.id);
  };

  const handleSave = (data) => {
    const promise = selectedMeeting
      ? updateMeeting(selectedMeeting.id, data)
      : createMeeting(data);
    promise.then(() => setIsEditing(false));
  };

  if (isFetching) return <Loader height="calc(100vh - 80px)" />;

  if (error) {
    return (
      <Message
        status="failure"
        title="Connection Error"
        description="We could not load your meetings"
      />
    );
  }

  return (
    <MeetingsContext.Provider
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
        selectedMeeting,
        meetings,
        error,
      }}
    >
      {children}
    </MeetingsContext.Provider>
  );
};
