import { useState, useEffect } from "react";
import { useDocument as useFirstoreDocument } from "react-firebase-hooks/firestore";

function useDocument(query, options) {
  const [document, setDocument] = useState();
  const [snapshot, loading, error] = useFirstoreDocument(query, options);

  useEffect(() => {
    console.log(snapshot);
    if (!error && !loading && snapshot) {
      console.log(snapshot.id);
      setDocument({ id: snapshot.id, ...snapshot.data() });
    }
  }, [snapshot]);

  return [document, loading, error];
}

export default useDocument;
