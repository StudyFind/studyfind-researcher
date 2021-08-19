import { usePagination } from "hooks";
import { auth, firestore } from "database/firebase";

import { Loader } from "components";

import DashboardGrid from "./DashboardGrid";
import DashboardEmpty from "./DashboardEmpty";
import DashboardError from "./DashboardError";

function Dashboard() {
  const verified = auth.currentUser.emailVerified;
  const studiesRef = firestore
    .collection("studies")
    .where("researcher.id", "==", auth.currentUser.uid)
    .orderBy("createdAt", "desc");

  const {
    documents: studies,
    loading,
    loadingMore,
    handleLoadMore,
    fetchedAll,
    error,
  } = usePagination(studiesRef, 10);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <DashboardError verified={verified} />;
  }

  if (!studies?.length) {
    return <DashboardEmpty verified={verified} />;
  }

  return (
    <DashboardGrid
      verified={verified}
      studies={studies}
      fetchedAll={fetchedAll}
      loadingMore={loadingMore}
      handleLoadMore={handleLoadMore}
    />
  );
}

export default Dashboard;
