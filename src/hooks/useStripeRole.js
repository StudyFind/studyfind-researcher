import { useEffect, useState } from "react";
import { auth } from "database/firebase";

function useStripeRole() {

  const[userStripeRole, setUserStripeRole] = useState()

  const getCustomClaimRole = async () => {
    await auth.currentUser.getIdToken(true);
    const decodedToken = await auth.currentUser.getIdTokenResult();
    if (decodedToken && decodedToken.claims && decodedToken.claims.stripeRole){
      setUserStripeRole(decodedToken.claims.stripeRole);
    }
    else{
      setUserStripeRole('basic');
    }
  }

  useEffect(() => {
    getCustomClaimRole();
  }, []);

  return userStripeRole
}

export default useStripeRole;