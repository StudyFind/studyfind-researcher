import React, { useState } from "react";

import ScreeningView from "./ScreeningView";
import ScreeningEdit from "./ScreeningEdit";

function Screening({ study }) {
  const [edit, setEdit] = useState(false);

  return edit ? (
    <ScreeningEdit study={study} setEdit={setEdit} />
  ) : (
    <ScreeningView study={study} setEdit={setEdit} />
  );
}

export default Screening;
