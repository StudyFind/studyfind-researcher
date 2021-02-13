import React from "react";
import moment from "moment";

import { useCollection } from "hooks";
import { auth, firestore } from "database/firebase";

import MeetingsLoading from "./MeetingsLoading";
import MeetingsError from "./MeetingsError";
import MeetingsList from "./MeetingsList";
import MeetingsEmpty from "./MeetingsEmpty";

function Meetings({ date }) {
  const [meetings, loading, error] = useCollection(
    firestore
      .collection("meetings")
      .where("researcherID", "==", auth.currentUser.uid)
      .where("time", ">=", moment(date).startOf("day").valueOf())
      .where("time", "<=", moment(date).endOf("day").valueOf())
      .orderBy("time", "asc")
  );

  if (loading) return <MeetingsLoading />;
  if (error) return <MeetingsError />;

  return meetings && meetings.length ? <MeetingsList meetings={meetings} /> : <MeetingsEmpty />;
}

export default Meetings;
