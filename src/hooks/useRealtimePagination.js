import { useState, useEffect } from "react";

function useRealtimePagination(ref, limit) {
  const [documents, setDocuments] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [fetchedAll, setFetchedAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [additionalLoading, setAdditionalLoading] = useState(false);
  const [error, setError] = useState(null);

  const transformData = (snapshot) => {
    const documents = [];
    snapshot.forEach((doc) => documents.push({ id: doc.id, ...doc.data() }));
    return documents;
  };

  //  <- new            old->
  //  0 1 2 3 4 5 6 7 8 9 ...

  const handleLive = (prev, next) => {
    const match = prev.findIndex((d) => d.id === next[next.length - 1].id);
    return next.concat(prev.slice(match + 1));
  };

  useEffect(() => {
    ref.limit(limit).onSnapshot((snapshot) => {
      setDocuments((prev) => {
        const next = transformData(snapshot);
        console.table(next.map(({ text, time }) => ({ text, time })));
        return handleLive(prev, next);
      });

      if (!lastDoc) {
        setLoading(false);
      }

      if (snapshot.docs.length < limit) {
        setFetchedAll(true);
      }

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    });
  }, []);

  const handleFetchAdditional = () => {
    setAdditionalLoading(true);
    ref
      .limit(limit)
      .startAfter(lastDoc)
      .get()
      .then((snapshot) => {
        setDocuments((prev) => {
          const next = transformData(snapshot);
          console.table(next.map(({ text, time }) => ({ text, time })));
          return prev.concat(next);
        });

        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

        if (snapshot.docs.length < limit) {
          setFetchedAll(true);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setAdditionalLoading(false));
  };

  return [documents, loading, error, handleFetchAdditional, additionalLoading, fetchedAll];
}

export default useRealtimePagination;
