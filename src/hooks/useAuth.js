import { useState, useEffect } from "react";

import { auth } from "database/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function useAuth() {
  const [cred, loading] = useAuthState(auth);
  const [researcher, setResearcher] = useState(null);

  const handleResearcherCheck = async () => {
    const { claims } = await cred.getIdTokenResult();
    setResearcher(claims.participant);
  };

  useEffect(() => {
    if (cred) {
      handleResearcherCheck();
    } else {
      setResearcher(false);
    }
  }, [cred]);

  return [cred, researcher, loading || researcher === null];
}

export default useAuth;
