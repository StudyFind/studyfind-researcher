import { MeetingsProvider } from "./MeetingsContext";
import MeetingsContent from "./MeetingsContent";

function Meetings() {
  return (
    <MeetingsProvider>
      <MeetingsContent />
    </MeetingsProvider>
  );
}

export default Meetings;
