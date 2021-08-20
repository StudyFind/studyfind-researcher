import { useTriggerToast } from "hooks";
import { toasts } from "templates";
import { feedback } from "database/mutations";

import FeedbackForm from "components/feature/FeedbackForm/FeedbackForm";

function Feedback() {
  const triggerToast = useTriggerToast();

  const handleSubmit = ({ title, body }) => {
    return feedback.submit({ title, body }).then(() => triggerToast(toasts.providedFeedback));
  };

  return <FeedbackForm onSubmit={handleSubmit} />;
}

export default Feedback;
