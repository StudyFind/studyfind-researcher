import React, { useState, useEffect } from "react";
import FilesViewer from "./FilesView";
import FilesEdit from "./FilesEdit";
import { storage } from "database/firebase";
import { useToast } from "@chakra-ui/react";

function Files({ study }) {
  const [edit, setEdit] = useState(false);
  const [files, setFiles] = useState([]);
  const toast = useToast();

  const getFiles = async () => {
    const { items } = await storage.ref(`file/${study.id}`).listAll();

    const tempFiles = await Promise.all(
      items.map(async (ref) => {
        const url = await ref.getDownloadURL();
        return { name: ref.name, link: url };
      })
    );

    setFiles(tempFiles);
  };
  const deleteFile = (fileName) => {
    var desertRef = storage.ref(`file/${study.id}/${fileName}`);
    desertRef
      .delete()
      .then(() => {
        toast({
          title: "Study Deleted!",
          description: `Your study was successfully deleted along with all information`,
          status: "error",
          duration: 2500,
          isClosable: true,
          position: "top",
        });
      })
      .catch(() => {
        toast({
          title: "Connection Error",
          description:
            "Your study could not be deleted due to a connection error. Please check your internet connection and try again.",
          status: "error",
          duration: 2500,
          isClosable: true,
          position: "top",
        });
      });
  };

  useEffect(() => {
    getFiles();
  }, []);

  return edit ? (
    <FilesEdit study={study} setEdit={setEdit} />
  ) : (
    <FilesViewer study={study} setEdit={setEdit} files={files} deleteFile={deleteFile} />
  );
}

export default Files;
