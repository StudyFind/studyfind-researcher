import { useState } from "react";

import ResourcesView from "./ResourcesView";
import ResourcesEdit from "./ResourcesEdit";

function Resources({ study }) {
  const [edit, setEdit] = useState(false);

  return edit ? (
    <ResourcesEdit study={study} setEdit={setEdit} />
  ) : (
    <ResourcesView study={study} setEdit={setEdit} />
  );
}

export default Resources;
