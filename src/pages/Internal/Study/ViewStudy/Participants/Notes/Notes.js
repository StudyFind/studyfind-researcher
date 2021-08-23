import { NotesProvider } from "./NotesContext";
import NotesContent from "./NotesContent";

function Notes() {
  return (
    <NotesProvider>
      <NotesContent />
    </NotesProvider>
  );
}

export default Notes;
