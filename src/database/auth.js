import { auth, firestore } from "./firebase";
import axios from "axios";
import moment from "moment-timezone";
import errors from "./errors";

const CLOUD_API_URL = "https://us-central1-studyfind-researcher.cloudfunctions.net";

const getErrorMessage = ({ code }) => ({ email: "", password: "", ...errors[code] });

const forgotPassword = async (email) => auth.sendPasswordResetEmail(email);

const signup = async (name, email, password) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    const idToken = await auth.currentUser.getIdToken(false);

    await axios.get(`${CLOUD_API_URL}/setResearcherClaim`, { params: { idToken } });

    await user.sendEmailVerification();

    await firestore
      .collection("researchers")
      .doc(user.uid)
      .set({ name, timezone: moment.tz.guess() });

    localStorage.setItem("exists", true);
    return user;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

const signin = async (email, password) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    localStorage.setItem("exists", true);
    return user;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

const signout = async () => auth.signOut();

const deleteAccount = async (email, password) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    await firestore.collection("researchers").doc(user.uid).delete();
    user.delete();
    localStorage.setItem("exists", false);
  } catch (error) {
    throw getErrorMessage(error);
  }
};

// ========================== PASSWORD UPDATES ========================== //

const resetPassword = async (actionCode, password) => {
  try {
    const email = await auth.verifyPasswordResetCode(actionCode);
    await auth.confirmPasswordReset(actionCode, password);
    return signin(email, password);
  } catch (error) {
    throw getErrorMessage(error);
  }
};

const changePassword = async (password, newPassword) => {
  try {
    const { email } = await auth.currentUser;
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    return user.updatePassword(newPassword);
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export { deleteAccount, forgotPassword, resetPassword, changePassword, signin, signup, signout };
