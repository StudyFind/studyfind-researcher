import React from "react";

import { auth } from "database/firebase";

import DashboardGrid from "views/Internal/Dashboard/DashboardGrid";
import DashboardEmpty from "views/Internal/Dashboard/DashboardEmpty";

function Dashboard({ studies }) {
  const verified = auth.currentUser.emailVerified;

  return studies && studies.length ? (
    <DashboardGrid verified={verified} studies={studies} />
  ) : (
    <DashboardEmpty verified={verified} />
  );
}

export default Dashboard;
