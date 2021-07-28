import { ConfirmationStatus } from "@studyfind/components";

function ReminderConfirmation({ confirmedByParticipant }) {
  const { status, hint, text } = confirmedByParticipant
    ? {
        status: "success",
        hint: "Confirmed by participant",
        text: "Confirmed",
      }
    : {
        status: "neutral",
        hint: "Waiting for participant to confirm",
        text: "Pending",
      };

  return (
    <ConfirmationStatus status={status} hint={hint}>
      {text}
    </ConfirmationStatus>
  );
}

export default ReminderConfirmation;
