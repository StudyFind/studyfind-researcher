import React, { useState, useEffect } from "react";
import { fetchStudies } from "database/studies";

import { Page } from "components";
import DashboardGrid from "views/Internal/Dashboard/DashboardGrid";
import DashboardEmpty from "views/Internal/Dashboard/DashboardEmpty";

function Dashboard() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudies()
      .then(setStudies)
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Page isLoading={loading}>
      {studies.length ? <DashboardGrid studies={studies} /> : <DashboardEmpty />}
    </Page>
  );
}

export default Dashboard;
