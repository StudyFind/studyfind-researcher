import { useState } from "react";

import { Loader } from "components";

import MeetingsView from "./MeetingsView";
import MeetingsEdit from "./MeetingsEdit";
import MeetingsError from "./MeetingsError";

function Meetings({ participant, study }) {
  const meetings = [];
  const loading = false;
  const error = "";

  const [edit, setEdit] = useState(false);
  const [meeting, setMeeting] = useState(null);

  const handleEdit = (meeting) => {
    setEdit(true);
    setMeeting(meeting || null);
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
