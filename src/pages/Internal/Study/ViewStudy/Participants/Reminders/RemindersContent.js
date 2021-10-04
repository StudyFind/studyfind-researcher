import { useContext } from "react";
import { RemindersContext } from "./RemindersContext";

import RemindersView from "./RemindersView";
import RemindersEdit from "./RemindersEdit";

function RemindersContent() {
  const { isEditing } = useContext(RemindersContext);
  return isEditing ? <RemindersEdit /> : <RemindersView />;
}

export default RemindersContent;
