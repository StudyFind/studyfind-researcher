import { auth, firestore } from "database/firebase";
import { setResearcherClaim } from "database/cloud";

import errors from "database/errors";
import moment from "moment-timezone";

const getErrorMessage = ({ code }) => {
  return { email: "", password: "", ...errors[code] };
};

const setLocalUserExists = () => {
  localStorage.setItem("exists", true);
};

const setLocalUserDelete = () => {
  localStorage.setItem("exists", false);
};

const signup = async (name, email, password) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    const timezone = moment.tz.guess();

    await Promise.all([
      setResearcherClaim(),
      user.sendEmailVerification(),
      firestore
        .collection("researchers")
        .doc(user.uid)
        .set({
          name,
          timezone,
          organization: "",
          background: "",
          preferences: {
            timezone: {
              autodetect: true,
            },
            notifications: {
              email: false,
              phone: false,
              categories: {
                account: true,
                studies: true,
                participants: true,
                meetings: true,
                messages: true,
              },
            },
          },
        }),
    ]);

    setLocalUserExists();
  } catch (error) {
    throw getErrorMessage(error);
  }
};

const signin = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    setLocalUserExists();
  } catch (error) {
    throw getErrorMessage(error);
  }
};

const signout = async () => {
  return auth.signOut();
};

const deleteAccount = async (email, password) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    await firestore.collection("researchers").doc(user.uid).delete();
    await user.delete();
    setLocalUserDelete();
  } catch (error) {
    throw getErrorMessage(error);
  }
};

// ========================== PASSWORD UPDATES ========================== //

const forgotPassword = async (email) => {
  return auth.sendPasswordResetEmail(email);
};

const changePassword = async (password, newPassword) => {
  try {
    const { email } = await auth.currentUser;
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    await user.updatePassword(newPassword);
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export {
  // DATA //
  deleteAccount,
  forgotPassword,
  changePassword,
  // AUTH //
  signin,
  signup,
  signout,
};
