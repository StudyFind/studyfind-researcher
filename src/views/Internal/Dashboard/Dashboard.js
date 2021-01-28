import React from "react";

import DashboardGrid from "views/Internal/Dashboard/DashboardGrid";
import DashboardEmpty from "views/Internal/Dashboard/DashboardEmpty";

function Dashboard({ studies }) {
  return studies.length ? <DashboardGrid studies={studies} /> : <DashboardEmpty />;
}

export default Dashboard;
