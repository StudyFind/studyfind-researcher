import { useEffect, useState } from "react";
import { datetime } from "utils";
import { storage } from "database/firebase";

import FilesGrid from "./FilesGrid";
import FilesForm from "./FilesForm";

function Files({ study }) {
  const [edit, setEdit] = useState(false);

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFiles = async () => {
    const { items } = await storage.ref(`study/${study.id}`).listAll();

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

  return edit ? (
    <FilesForm studyID={study.id} setEdit={setEdit} getFiles={getFiles} />
  ) : (
    <FilesGrid
      studyID={study.id}
      setEdit={setEdit}
      getFiles={getFiles}
      files={files}
      loading={loading}
    />
  );
}

export default Files;
