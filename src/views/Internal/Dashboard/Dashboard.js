import React, { useState, useEffect } from "react";
import { fetchStudies } from "database/studies";

import DashboardView from "./DashboardView";

function Dashboard() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudies()
      .then(setStudies)
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  return <DashboardView studies={studies} loading={loading} />;
}

export default Dashboard;
