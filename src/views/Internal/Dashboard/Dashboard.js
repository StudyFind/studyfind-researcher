import { useContext } from "react";
import { StudiesContext } from "context";

import { auth } from "database/firebase";

import DashboardGrid from "views/Internal/Dashboard/DashboardGrid";
import DashboardEmpty from "views/Internal/Dashboard/DashboardEmpty";

function Dashboard() {
  const studies = useContext(StudiesContext);
  const verified = auth.currentUser.emailVerified;

  return studies && studies.length ? (
    <DashboardGrid verified={verified} studies={studies} />
  ) : (
    <DashboardEmpty verified={verified} />
  );
}

export default Dashboard;
