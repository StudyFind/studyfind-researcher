import { auth, firestore } from "database/firebase";

const fetchUser = async () => {
  const user = await auth.currentUser;
  const document = await firestore.collection("researchers").doc(user.uid).get();
  return { id: document.id, email: user.email, ...document.data() };
};

export { fetchUser };
