import { useState } from "react";

import DetailsView from "./DetailsView";
import DetailsEdit from "./DetailsEdit";

function Details({ study }) {
  const [edit, setEdit] = useState(false);

  return edit ? (
    <DetailsEdit study={study} setEdit={setEdit} />
  ) : (
    <DetailsView study={study} setEdit={setEdit} />
  );
}

export default Details;
