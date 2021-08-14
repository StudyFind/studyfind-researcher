import SideDrawer from "components/complex/SideDrawer/SideDrawer";

import Meetings from "./Meetings/Meetings";
import Messages from "./Messages/Messages";
import Reminders from "./Reminders/Reminders";
import Notes from "./Notes/Notes";
import Screening from "./Screening/Screening";
import Status from "./Status/Status";

function ParticipantsDrawer({ action, participant, isOpen, handleClose }) {
  const fakename = participant?.fakename;
  const timezone = participant?.timezone;

  const render = {
    meetings: action === "meetings" && <Meetings />,
    reminders: action === "reminders" && <Reminders />,
    messages: action === "messages" && <Messages />,
    notes: action === "notes" && <Notes />,
    screening: action === "screening" && <Screening />,
    status: action === "status" && <Status />,
  };

  return (
    <SideDrawer
      heading={action}
      subheading={`${fakename} (${timezone})`}
      isOpen={isOpen}
      onClose={handleClose}
    >
      {render[action]}
    </SideDrawer>
  );
}

export default ParticipantsDrawer;
