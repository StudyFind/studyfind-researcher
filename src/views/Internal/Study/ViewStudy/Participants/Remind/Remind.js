import React, { useState } from "react";
import RemindView from "./RemindView";
import RemindEdit from"./RemindEdit";
function Remind({participant}) {
    const [edit, setEdit] = useState(false);
    return edit ? (
        <RemindEdit setEdit={setEdit}/>
      ) : (
        <RemindView participant={participant} setEdit={setEdit}/>
      );
}
export default Remind;