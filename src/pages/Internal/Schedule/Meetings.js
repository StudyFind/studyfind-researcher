import { useState } from "react";
import { meeting } from "data";

import MeetingsLoading from "./MeetingsLoading";
import MeetingsError from "./MeetingsError";
import MeetingsList from "./MeetingsList";
import MeetingsEmpty from "./MeetingsEmpty";

function Meetings({ date }) {
  const [meetings, setMeetings] = useState([meeting, meeting, meeting]);

  const loading = false;
  // const error = "This is an error";
  const error = "";

  if (loading) return <MeetingsLoading />;
  if (error) return <MeetingsError />;

  return meetings && meetings.length ? (
    <MeetingsList meetings={meetings} />
  ) : (
    <MeetingsEmpty />
  );
}

export default Meetings;
