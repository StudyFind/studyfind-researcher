import React, { useState, useEffect } from "react";
import { fetchStudies } from "database/studies";
import { Page } from "components";

import DashboardEmpty from "./DashboardEmpty";
import DashboardGrid from "./DashboardGrid";

function Dashboard() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudies()
      .then(setStudies)
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  const GRID = <DashboardGrid studies={studies} />;
  const EMPTY = <DashboardEmpty />;

  return <Page isLoading={loading}>{studies.length ? GRID : EMPTY}</Page>;
}

export default Dashboard;
