import React, { useState } from "react";
import RemindView from "./RemindView";
import RemindEdit from"./RemindEdit";
function Remind({reminders}) {
    const [edit, setEdit] = useState(false);
    return edit ? (
        <RemindEdit setEdit={setEdit}/>
      ) : (
        <RemindView reminders={reminders} setEdit={setEdit}/>
      );
}
export default Remind;