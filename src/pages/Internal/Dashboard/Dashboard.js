import { useEffect, useState } from "react";
import { useCollection } from "hooks";

import { auth, firestore } from "database/firebase";

import { Loader } from "components";

import DashboardGrid from "./DashboardGrid";
import DashboardEmpty from "./DashboardEmpty";

function Dashboard() {
  const verified = auth.currentUser.emailVerified;

  const [studies, loading, error] = useCollection(
    firestore.collection("studies").where("researcher.id", "==", auth.currentUser.uid)
  );

  const [moreLoading, setMoreLoading] = useState(false);

  const handleLoadInitial = () => {};

  const handleLoadMore = () => {};

  useEffect(() => {
    handleLoadInitial();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return studies && studies.length ? (
    <DashboardGrid
      verified={verified}
      studies={studies}
      moreLoading={moreLoading}
      handleLoadMore={handleLoadMore}
    />
  ) : (
    <DashboardEmpty verified={verified} />
  );
}

export default Dashboard;
