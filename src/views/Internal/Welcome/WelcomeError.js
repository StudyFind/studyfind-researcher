import { Message } from "components";

function WelcomeError({ message }) {
  console.log(message);
  return (
    <Message
      status="failure"
      title="Fetching Failed"
      description={message || "We could not fetch the requested studies"}
    />
  );
}

export default WelcomeError;
