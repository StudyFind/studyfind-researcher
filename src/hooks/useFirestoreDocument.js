import { useState, useEffect } from "react";
import { useDocument } from "react-firebase-hooks/firestore";

function useFirestoreCollection(query, options) {
  const [document, setDocument] = useState();
  const [snapshot, loading, error] = useDocument(query, options);

  useEffect(() => {
    if (snapshot) {
      setDocument({ id: snapshot.id, ...snapshot.data() });
    }
  }, [snapshot]);

  return [document, loading, error];
}

export default useFirestoreCollection;
