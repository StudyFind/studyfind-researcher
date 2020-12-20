import React, { useState } from "react";
import RemindView from "./RemindView";
import RemindEdit from"./RemindEdit";
function Remind({participant, study}) {
    const [edit, setEdit] = useState(false);
    return edit ? (
        <RemindEdit participant={participant} study={study} setEdit={setEdit}/>
      ) : (
        <RemindView participant={participant} setEdit={setEdit}/>
      );
}
export default Remind;