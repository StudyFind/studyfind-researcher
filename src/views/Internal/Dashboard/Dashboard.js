import React from "react";

import DashboardGrid from "views/Internal/Dashboard/DashboardGrid";
import DashboardEmpty from "views/Internal/Dashboard/DashboardEmpty";

function Dashboard({ studies }) {
  const published = studies.filter((study) => study.published);
  return published.length ? <DashboardGrid studies={published} /> : <DashboardEmpty />;
}

export default Dashboard;
