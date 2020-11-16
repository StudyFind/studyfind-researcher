import React, { useState } from "react";

import ConsentViewer from "./ConsentViewer";
import ConsentUpload from "./ConsentUpload";

function Consent({ study }) {
  const [edit, setEdit] = useState(false);

  return edit ? (
    <ConsentUpload study={study} setEdit={setEdit} />
  ) : (
    <ConsentViewer study={study} setEdit={setEdit} />
  );
}

export default Consent;
