import { Message } from "components";

function WelcomeError() {
  return (
    <Message
      status="failure"
      title="Fetching Failed"
      description="We could not fetch the requested studies"
    />
  );
}

export default WelcomeError;
