import React, { useState, useEffect } from "react";
import { auth, firestore } from "database/firebase";

import StudiesView from "./StudiesView";

function Studies() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudies = async () => {
    const { currentUser } = await auth;
    firestore
      .collection("studies")
      .where("researcher.id", "==", currentUser.uid)
      .get()
      .then((snapshot) => {
        const studies = [];
        snapshot.forEach((doc) => studies.push(doc.data()));
        setStudies(studies);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudies();
  }, []);

  return <StudiesView studies={studies} loading={loading} />;
}

export default Studies;
