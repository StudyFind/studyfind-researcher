import React from "react";
import { useAuth } from "hooks";

import Denied from "./Denied";
import Loading from "./Loading";
import External from "views/External/External";
import Internal from "views/Internal/Internal";

function App() {
  const [cred, researcher, loading] = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (cred) {
    return researcher ? <Internal /> : <Denied email={cred.email} />;
  }

  return <External />;
}

export default App;
