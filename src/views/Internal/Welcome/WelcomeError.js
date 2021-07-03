import { Message } from "@studyfind/components";

function WelcomeError({ message }) {
  return (
    <Message
      status="failure"
      title="Fetching Failed"
      description={message || "We could not fetch the requested studies"}
    />
  );
}

export default WelcomeError;
