import moment from "moment-timezone";

import SideDrawer from "components/complex/SideDrawer/SideDrawer";

import Meetings from "./Meetings/Meetings";
import Messages from "./Messages/Messages";
import Reminders from "./Reminders/Reminders";
import Notes from "./Notes/Notes";
import Questions from "./Questions/Questions";
import Status from "./Status/Status";

function ParticipantsDrawer({
  action,
  isOpen,
  study,
  participant,
  handleClose,
}) {
  const fakename = participant?.fakename || participant?.id;
  const timezone = participant?.timezone?.region;

  const render = {
    status: action === "status" && (
      <Status participant={participant} handleClose={handleClose} />
    ),
    meetings: action === "meetings" && <Meetings />,
    reminders: action === "reminders" && <Reminders />,
    messages: action === "messages" && <Messages />,
    notes: action === "notes" && <Notes />,
    questions: action === "questions" && (
      <Questions
        questions={study.questions}
        responses={participant.responses}
      />
    ),
  };

  return (
    <SideDrawer
      heading={action}
      subheading={`${fakename} (${moment.tz(timezone).zoneAbbr()})`}
      isOpen={isOpen}
      onClose={handleClose}
    >
      {render[action]}
    </SideDrawer>
  );
}

export default ParticipantsDrawer;
