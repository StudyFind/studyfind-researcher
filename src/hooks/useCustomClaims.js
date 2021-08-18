import { auth } from "database/firebase";
import { useEffect, useState } from "react";

function useCustomClaims() {
  const [claims, setClaims] = useState(null);

  useEffect(() => {
    const cred = auth.currentUser;

    if (cred) {
      cred.getIdTokenResult(true).then((data) => setClaims(data.claims));
    }
  });

  return claims;
}

export default useCustomClaims;

// const claims = useCustomClaims()
