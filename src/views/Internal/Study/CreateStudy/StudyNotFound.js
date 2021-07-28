import { Message } from "@studyfind/components";

function StudyNotFound({ studyID }) {
  return (
    <Message
      status="failure"
      title="Study not found!"
      description={`The study ${studyID} could not be found in the StudyFind database. Please
  ensure that it has been successfully created by following all directions in the study
  creation process.`}
    />
  );
}

export default StudyNotFound;
