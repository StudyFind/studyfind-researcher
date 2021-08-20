import { useState } from "react";

import FilesGrid from "./FilesGrid";
// import FilesForm from "./FilesForm";

function Files({ study }) {
  const [edit, setEdit] = useState(false);

  // return edit ? (
  //   <FilesForm study={study} setEdit={setEdit} />
  // ) : (
  //   <FilesGrid study={study} setEdit={setEdit} />
  // );

  return <FilesGrid study={study} setEdit={setEdit} />;
}

export default Files;
