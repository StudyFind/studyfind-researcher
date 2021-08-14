import { useState } from "react";

import LocationsView from "./LocationsView";
import LocationsEdit from "./LocationsEdit";

function Locations({ study }) {
  const [edit, setEdit] = useState(false);

  return edit ? (
    <LocationsEdit study={study} setEdit={setEdit} />
  ) : (
    <LocationsView study={study} setEdit={setEdit} />
  );
}

export default Locations;
