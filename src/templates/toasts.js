const LONG = 5000;
const SHORT = 2500;

const connectionError = {
  title: "Connection Error",
  description: `Your action could not be completed because of a connection error. Please try again later.`,
  status: "error",
  duration: LONG,
  isClosable: true,
  position: "top",
};

const stripeCancel = {
  title: "Transaction Cancelled",
  description: `You have cancelled the Stripe checkout session.`,
  status: "info",
  duration: SHORT,
  isClosable: true,
  position: "bottom",
};

const stripeSuccess = {
  title: "Transaction Recieved Successfully",
  description: `You have successfully subscribed to a StudyFind plan. Look above to see the details of your plan!`,
  status: "success",
  duration: SHORT,
  isClosable: true,
  position: "bottom",
};

const updatedAccount = {
  title: "Your profile information was successfully updated",
  status: "success",
  duration: LONG,
  isClosable: true,
  position: "top",
};

const deletedAccount = {
  title: "Account Deleted",
  description: "Your account has been deleted along with all your user data and research studies.",
  status: "success",
  duration: LONG,
  isClosable: true,
  position: "top",
};

const changedPassword = {
  title: "Password Changed",
  description: "You can now use your new password to log in",
  status: "success",
  duration: LONG,
  isClosable: true,
  position: "top",
};

const providedFeedback = {
  title: "Thank you for your feedback",
  description: `Your feedback was successfully sent and we will be reviewing it carefully. Thank you for taking the time to help make StudyFind work better :)`,
  status: "info",
  duration: LONG,
  isClosable: true,
  position: "top",
};

const createdStudy = {
  title: "Study Created",
  description: `Your study was successfully created and has been added to your account.`,
  status: "success",
  duration: LONG,
  isClosable: true,
  position: "top",
};

const deletedStudy = {
  title: "Study Deleted",
  description: `Your study was successfully deleted and will no longer be accessible through StudyFind`,
  status: "success",
  duration: LONG,
  isClosable: true,
  position: "top",
};

const deletedReminder = {
  title: "Reminder Deleted",
  description: `This reminder has been successfully deleted and the respective participant has been notified`,
  status: "success",
  duration: SHORT,
  isClosable: true,
  position: "top",
};

const deletedMeeting = {
  title: "Meeting Deleted",
  description: `This meeting has been successfully deleted and the respective participant has been notified`,
  status: "success",
  duration: SHORT,
  isClosable: true,
  position: "top",
};

const deletedNote = {
  title: "Note Deleted",
  description: "This private participant note has been successfully deleted",
  status: "success",
  duration: SHORT,
  isClosable: true,
  position: "top",
};

export default {
  connectionError, // generic error toast
  updatedAccount, // account page - everything except security tab
  deletedAccount, // account page - only security tab
  changedPassword, // account page - only security tab
  providedFeedback, // feedback page
  createdStudy, // create study page - review step
  deletedStudy, // create study page - review step && view study page - settings tab
  deletedReminder,
  deletedMeeting,
  deletedNote,
  stripeCancel,
  stripeSuccess
};
