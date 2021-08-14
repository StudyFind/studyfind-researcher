import { useEffect, useState } from "react";
import { mockPromiseResolve } from "mock";

import DashboardGrid from "./DashboardGrid";
import DashboardEmpty from "./DashboardEmpty";
import { Loader } from "components";
import { auth, firestore } from "database/firebase";
import { useDocument } from "hooks";

function Dashboard() {
  const [studies, loading, error] = useDocument(
    firestore.documents("studies").where("researcher.id", "==", auth.currentUser.uid)
  );
  const [moreLoading, setMoreLoading] = useState(false);

  const verified = true;

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
