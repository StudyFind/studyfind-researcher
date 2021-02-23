import React, { useState, useEffect } from "react";

import FilesViewer from "./FilesView";
import FilesEdit from "./FilesEdit";
import { storage } from "database/firebase";

function Files({ study }) {
  const [edit, setEdit] = useState(false);
  const [files, setFiles] = useState([]);

  const getFiles = async () => {
    const { items } = await storage.ref(`file/NCT04655001`).listAll();

    const tempFiles = await Promise.all(
      items.map(async (ref) => {
        const url = await ref.getDownloadURL();
        return { name: ref.name, link: url };
      })
    );

    setFiles(tempFiles);
  };

  useEffect(() => {
    getFiles();
  }, []);

  return edit ? (
    <FilesEdit study={study} setEdit={setEdit} />
  ) : (
    <FilesViewer study={study} setEdit={setEdit} files={files} />
  );
}

export default Files;
