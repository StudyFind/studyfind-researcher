import { useToast } from "@chakra-ui/react";
import { feedback } from "database/mutations";
import { toasts } from "templates";

import FeedbackForm from "components/feature/Feedback/FeedbackForm";

function Feedback() {
  const toast = useToast();

  const handleSubmit = ({ title, body }) => {
    return feedback.submit({ title, body }).then(() => toast(toasts.providedFeedback));
  };

  return <FeedbackForm onSubmit={handleSubmit} />;
}

export default Feedback;
