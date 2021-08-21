import { usePagination, useUserData } from "hooks";
import { auth } from "database/firebase";
import { buildDashboardQuery } from "database/queries";

import { Loader } from "components";

import DashboardGrid from "./DashboardGrid";
import DashboardEmpty from "./DashboardEmpty";
import DashboardError from "./DashboardError";

function Dashboard() {
  const { uid, emailVerified } = useUserData(auth);

  const dashboardQuery = buildDashboardQuery(uid);

  const {
    documents: studies,
    loading,
    loadingMore,
    handleLoadMore,
    fetchedAll,
    error,
  } = usePagination(dashboardQuery, 10);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <DashboardError verified={emailVerified} />;
  }

  if (studies.length === 0) {
    return <DashboardEmpty verified={emailVerified} />;
  }

  return (
    <DashboardGrid
      verified={emailVerified}
      studies={studies}
      fetchedAll={fetchedAll}
      loadingMore={loadingMore}
      handleLoadMore={handleLoadMore}
    />
  );
}

export default Dashboard;
