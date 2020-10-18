import React, { useState, useEffect } from "react";

import { auth } from "database/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signout, fetchUser } from "database";

import Loading from "./Loading";
import External from "views/External/External";
import Internal from "views/Internal/Internal";

function App() {
  const [cred, loading] = useAuthState(auth);
  const [user, setUser] = useState();

  const handleExternal = () => {
    setUser({});
    signout();
  };

  const handleInternal = async () => {
    const user = await fetchUser(cred.uid);
    setUser({ cred, user });
  };

  useEffect(() => {
    if (!loading) {
      if (cred && cred.emailVerified && cred.displayName === "researcher") {
        handleInternal();
      } else {
        handleExternal();
      }
    }
  }, [loading, cred]);

  if (!user) return <Loading />;
  if (!cred) return <External />;
  return <Internal />;
}

export default App;
