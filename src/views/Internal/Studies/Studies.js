import React, { useState, useEffect } from "react";
import { auth, fetchStudiesWhere } from "database";

import StudiesView from "./StudiesView";

function Studies() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudies = async () => {
    const { currentUser } = await auth;
    return fetchStudiesWhere("researcher.id", "==", currentUser.uid)
      .then(setStudies)
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
