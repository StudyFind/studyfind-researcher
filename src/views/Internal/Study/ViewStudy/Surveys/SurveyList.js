import { List } from "components";

import SurveyItem from "./SurveyItem";

function SurveyList({ surveys, handleEdit }) {
  return (
    <List>
      {surveys?.map((s, i) => (
        <List.Row key={i}>
          <SurveyItem survey={s} handleEdit={() => handleEdit(s.id)} />
        </List.Row>
      ))}
    </List>
  );
}

export default SurveyList;
