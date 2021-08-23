import { RemindersProvider } from "./RemindersContext";
import RemindersContent from "./RemindersContent";

function Reminders() {
  return (
    <RemindersProvider>
      <RemindersContent />
    </RemindersProvider>
  );
}

export default Reminders;
