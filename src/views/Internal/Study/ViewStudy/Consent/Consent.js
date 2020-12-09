import React, { useState } from "react";

import ConsentView from "./ConsentView";
import ConsentEdit from "./ConsentEdit";

function Consent({ study }) {
  const [edit, setEdit] = useState(false);

  return edit ? (
    <ConsentEdit study={study} setEdit={setEdit} />
  ) : (
    <ConsentView study={study} setEdit={setEdit} />
  );
}

export default Consent;
