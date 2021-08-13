import { useState, useEffect } from "react";

import { storage } from "database/firebase";
import { datetime } from "utils";
import { useParams } from "react-router-dom";

import FilesGrid from "./FilesGrid";
import FilesEdit from "./FilesEdit";
import FilesLoading from "./FilesLoading";

function Files() {
  const { studyID } = useParams();

  const [edit, setEdit] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFiles = async () => {
    const { items } = await storage.ref(`study/${studyID}`).listAll();

    const studyFiles = await Promise.all(
      items.map(async (ref) => {
        const meta = await ref.getMetadata();

        return {
          ref,
          name: ref.name,
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

  if (loading) {
    return <FilesLoading />;
  }

  return edit ? (
    <FilesEdit studyID={studyID} setEdit={setEdit} getFiles={getFiles} />
  ) : (
    <FilesGrid studyID={studyID} setEdit={setEdit} getFiles={getFiles} files={files} />
  );
}

export default Files;
