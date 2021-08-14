import { useState } from "react";
import { reminder as exampleReminder } from "data";

import { Loader } from "components";

import RemindersView from "./RemindersView";
import RemindersEdit from "./ReminderEdit/ReminderEdit";
import RemindersError from "./RemindersError";

function Reminders({ participant, study }) {
  // const [reminders, loading, error] = useCollection(
  //   firestore
  //     .collection("reminders")
  //     .where("participantID", "==", participant.id)
  //     .where("researcherID", "==", uid)
  //     .where("studyID", "==", study.id)
  //     .orderBy("startDate", "desc")
  // );

  const reminders = [exampleReminder, exampleReminder, exampleReminder];
  const loading = false;
  const error = "";

  const [edit, setEdit] = useState(false);
  const [reminder, setReminder] = useState(null);

  const handleEdit = (reminder) => {
    setEdit(true);
    setReminder(reminder || null);
  };

  const handleCancel = () => {
    setEdit(false);
    setReminder(null);
  };

  const handleDelete = (id) => {
    // firestore.collection("reminders").doc(id).delete();
  };

  if (loading) return <Loader />;
  if (error) return <RemindersError />;

  return edit ? (
    <RemindersEdit reminder={reminder} handleCancel={handleCancel} />
  ) : (
    <RemindersView
      reminders={reminders}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default Reminders;
