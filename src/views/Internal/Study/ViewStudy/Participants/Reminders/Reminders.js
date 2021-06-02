import { useState } from "react";

import { firestore } from "database/firebase";
import { useCollection } from "hooks";

import { Loader } from "components";

import RemindersView from "./RemindersView";
import RemindersEdit from "./RemindersEdit";
import RemindersError from "./RemindersError";

function Reminders({ participant, study }) {
  const [reminders, loading, error] = useCollection(
    firestore
      .collection("reminders")
      .where("participantID", "==", participant.id)
      .where("studyID", "==", study.id)
      .orderBy("startDate", "desc")
  );

  const [edit, setEdit] = useState(false);
  const [reminder, setReminder] = useState(null);

  const handleEdit = (reminder) => {
    setEdit(true);
    reminder && setReminder(reminder);
  };

  const handleCancel = () => {
    setEdit(false);
    setReminder(null);
  };

  if (loading) return <Loader />;
  if (error) return <RemindersError />;

  return edit ? (
    <RemindersEdit reminder={reminder} handleCancel={handleCancel} />
  ) : (
    <RemindersView reminders={reminders} handleEdit={handleEdit} />
  );
}

export default Reminders;
