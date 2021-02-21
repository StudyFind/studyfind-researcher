import React, { useState } from "react";

import FilesViewer from "./FilesView";
import FilesEdit from "./FilesEdit";
import { storage } from "database/firebase";

function Files({ study }) {
  const [edit, setEdit] = useState(false);
  var listRef = storage.ref(`file/NCT04655001`);
  var files = [];
  listRef
    .listAll()
    .then((res) => {
      res.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then((url) => {
          files.push({ fileName: itemRef.name, link: url });
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return edit ? (
    <FilesEdit study={study} setEdit={setEdit} />
  ) : (
    <FilesViewer study={study} setEdit={setEdit} files={files} />
  );
}

export default Files;
