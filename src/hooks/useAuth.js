import { useState, useEffect } from "react";

import { auth } from "database/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function useAuth() {
  const [cred, loading] = useAuthState(auth);
  const [researcher, setResearcher] = useState(null);

  const handleResearcherCheck = async () => {
    const { claims } = await cred.getIdTokenResult(true);
    setResearcher(claims.researcher);
  };

  useEffect(() => {
    if (cred) {
      handleResearcherCheck();
    }
  }, [cred]);

  return [cred, researcher, loading || (cred && researcher === null)];
}

export default useAuth;
