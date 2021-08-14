import { mockPromiseResolve } from "mock";

import FeedbackForm from "components/feature/Feedback/FeedbackForm";

function Feedback() {
  const handleSubmit = ({ title, body }) => {
    return mockPromiseResolve(() => {
      console.log({ title, body });
    });
  };

  return <FeedbackForm onSubmit={handleSubmit} />;
}

export default Feedback;
