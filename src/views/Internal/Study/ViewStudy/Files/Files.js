import React, { useState, useEffect } from "react";

import { toasts } from "templates";
import { storage } from "database/firebase";
import { datetime } from "functions";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import FilesGrid from "./FilesGrid";
import FilesEdit from "./FilesEdit";
import FilesLoading from "./FilesLoading";

function Files() {
  const toast = useToast();
  const { studyID } = useParams();

  const [edit, setEdit] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFiles = async () => {
    const { items } = await storage.ref(`study/${studyID}`).listAll();

    const studyFiles = await Promise.all(
      items.map(async (ref) => {
        const meta = await ref.getMetadata();
        const url = await ref.getDownloadURL();
        return {
          name: ref.name,
          link: url,
          date: datetime.getFriendlyDate(meta.timeCreated),
        };
      })
    );

    setFiles(studyFiles);
  };

  const initialLoad = async () => {
    setLoading(true);
    await getFiles();
    setLoading(false);
  };

  useEffect(() => {
    initialLoad();
  }, []);

  const handleDelete = (name) => {
    storage
      .ref(`study/${studyID}/${name}`)
      .delete()
      .then(() => getFiles())
      .catch(() => toast(toasts.connectionError));
  };

  if (loading) {
    return <FilesLoading />;
  }

  return edit ? (
    <FilesEdit studyID={studyID} setEdit={setEdit} getFiles={getFiles} />
  ) : (
    <FilesGrid studyID={studyID} setEdit={setEdit} files={files} handleDelete={handleDelete} />
  );
}

export default Files;
