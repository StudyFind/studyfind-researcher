import React, { useEffect } from "react";

import { auth } from "database/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signout } from "database";

import Loading from "./Loading";
import External from "views/External/External";
import Internal from "views/Internal/Internal";

function App() {
  const [cred, loading] = useAuthState(auth);

  useEffect(() => {
    if (cred && !(cred.emailVerified && cred.displayName === "researcher")) {
      signout();
    }
  }, [cred]);

  return loading ? <Loading /> : cred ? <Internal /> : <External />;
}

export default App;
