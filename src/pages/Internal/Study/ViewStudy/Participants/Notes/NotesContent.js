import { useContext } from "react";
import { NotesContext } from "./NotesContext";

import NotesView from "./NotesView";
import NotesEdit from "./NotesEdit";

function NotesContent() {
  const { isEditing } = useContext(NotesContext);
  return isEditing ? <NotesEdit /> : <NotesView />;
}

export default NotesContent;
