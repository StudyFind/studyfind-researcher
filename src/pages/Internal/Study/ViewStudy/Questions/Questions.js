import { useState } from "react";

import QuestionsView from "./QuestionsView";
import QuestionsEdit from "./QuestionsEdit";

function Questions({ study }) {
  const [edit, setEdit] = useState(false);

  return edit ? (
    <QuestionsEdit study={study} setEdit={setEdit} />
  ) : (
    <QuestionsView study={study} setEdit={setEdit} />
  );
}

export default Questions;
