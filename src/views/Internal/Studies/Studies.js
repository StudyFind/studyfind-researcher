import React, { useState, useEffect } from "react";
import { fetchStudies } from "database/studies";

import StudiesView from "./StudiesView";

function Studies() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudies()
      .then(setStudies)
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  return <StudiesView studies={studies} loading={loading} />;
}

export default Studies;
