import { useState, useEffect } from "react";

function usePagination(query, limit) {
  const [documents, setDocuments] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [fetchedAll, setFetchedAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const transformData = (snapshot) => {
    const documents = [];
    snapshot.forEach((doc) => documents.push({ id: doc.id, ...doc.data() }));
    return documents;
  };

  //  <- new            old->
  //  0 1 2 3 4 5 6 7 8 9 ...

  useEffect(() => {
    const unsubscribe = query.limit(limit).onSnapshot(
      (snapshot) => {
        const count = snapshot.docs.length;

        setDocuments((prev) => {
          const next = transformData(snapshot);
          const match = prev.findIndex((d) => d.id === next[count - 1].id);
          return next.concat(prev.slice(match + 1));
        });

        if (!lastDoc) {
          setLoading(false);
          setLastDoc(snapshot.docs[count - 1]);
        }

        if (count < limit) {
          setFetchedAll(true);
        }
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleLoadMore = () => {
    setLoadingMore(true);

    query
      .limit(limit)
      .startAfter(lastDoc)
      .get()
      .then((snapshot) => {
        const count = snapshot.docs.length;

        setDocuments((prev) => {
          const next = transformData(snapshot);
          return prev.concat(next);
        });

        if (count < limit) {
          setFetchedAll(true);
        }

        setLastDoc(snapshot.docs[count - 1]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoadingMore(false));
  };

  return { documents, loading, error, loadingMore, handleLoadMore, fetchedAll };
}

export default usePagination;
