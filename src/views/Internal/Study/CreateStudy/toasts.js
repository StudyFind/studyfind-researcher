const toasts = {
  deleteSuccess: {
    title: "Study Deleted!",
    description:
      "Your study was successfully deleted and will no longer be accessible through StudyFind",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top",
  },

  deleteFailure: {
    title: "Connection Error",
    description:
      "Your study could not be deleted due to a connection error. Please try again later.",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top",
  },

  publishSuccess: {
    title: "Study Published!",
    description:
      "Your study was successfully published is now available for participants to view and enroll.",
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "top",
  },

  publishFailure: {
    title: "Connection Error",
    description:
      "Your study could not be published due to a connection error. Please try again later.",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top",
  },

  savedProgress: {
    title: "Study Progress Saved!",
    description:
      "Your study along with any changes you made have been saved and can be published or deleted from the study settings tab.",
    status: "info",
    duration: 5000,
    isClosable: true,
    position: "top",
  },
};

export default toasts;
