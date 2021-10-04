import { useContext } from "react";
import { MeetingsContext } from "./MeetingsContext";

import MeetingsView from "./MeetingsView";
import MeetingsEdit from "./MeetingsEdit";

function MeetingsContent() {
  const { isEditing } = useContext(MeetingsContext);
  return isEditing ? <MeetingsEdit /> : <MeetingsView />;
}

export default MeetingsContent;
