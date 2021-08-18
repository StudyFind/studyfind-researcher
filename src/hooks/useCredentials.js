import { auth } from "database/firebase";

function useCredentials() {
  return auth.currentUser;
}

export default useCredentials;

// const { uid, email, emailVerified } = useCredentials()
