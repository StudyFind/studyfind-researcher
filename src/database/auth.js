import { auth } from "database/firebase";
import { researcher } from "./mutations";

import errors from "database/errors";

const getErrorMessage = ({ code }) => {
  return { email: "", password: "", ...errors[code] };
};

const setLocalUserExists = (value) => {
  localStorage.setItem("exists", value);
};

const signup = async ({ name, email, password }) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    await Promise.all([user.sendEmailVerification(), researcher.create(name)]);

    setLocalUserExists(true);
  } catch (error) {
    throw getErrorMessage(error);
  }
};

const signin = async ({ email, password }) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    setLocalUserExists(true);
  } catch (error) {
    throw getErrorMessage(error);
  }
};

const signout = async () => {
  return auth.signOut();
};

const forgotPassword = async ({ email }) => {
  try {
    await auth.sendPasswordResetEmail(email);
  } catch (error) {
    throw getErrorMessage(error);
  }
};

const changePassword = async ({ password, newPassword }) => {
  try {
    const { email } = auth.currentUser;
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    await user.updatePassword(newPassword);
  } catch (error) {
    throw getErrorMessage(error);
  }
};

const deleteAccount = async ({ email, password }) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    await researcher.delete();
    await user.delete();
    setLocalUserExists(false);
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export { signin, signup, signout, forgotPassword, changePassword, deleteAccount };
