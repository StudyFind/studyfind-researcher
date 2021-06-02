import { useState } from "react";

import { firestore } from "database/firebase";
import { useCollection } from "hooks";

import { Loader } from "components";

import MeetingsView from "./MeetingsView";
import MeetingsEdit from "./MeetingsEdit";
import MeetingsError from "./MeetingsError";

function Meetings({ participant, study }) {
  const [meetings, loading, error] = useCollection(
    firestore
      .collection("meetings")
      .where("participantID", "==", participant.id)
      .where("studyID", "==", study.id)
      .orderBy("time", "desc")
  );

  const [edit, setEdit] = useState(false);
  const [meeting, setMeeting] = useState(null);

  const handleEdit = (meeting) => {
    setEdit(true);
    meeting && setMeeting(meeting);
  };

  const handleCancel = () => {
    setEdit(false);
    setMeeting(null);
  };

  if (loading) return <Loader />;
  if (error) return <MeetingsError />;

  return edit ? (
    <MeetingsEdit meeting={meeting} handleCancel={handleCancel} />
  ) : (
    <MeetingsView meetings={meetings} handleEdit={handleEdit} />
  );
}

export default Meetings;
