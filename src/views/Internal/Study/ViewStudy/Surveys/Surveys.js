import { firestore } from "database/firebase";

import { useCollection } from "hooks";
import { useParams, useHistory } from "react-router-dom";

import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import { Loader } from "components";

import SurveyList from "./SurveyList";
import SurveyEdit from "./SurveyEdit";

function Surveys() {
  const history = useHistory();
  const { studyID, action } = useParams();

  const surveysRef = firestore.collection("studies").doc(studyID).collection("surveys");
  const [surveys, loading] = useCollection(surveysRef);
  const survey = surveys?.find((s) => s.id === action);

  const handleClose = () => {
    history.push(`/study/${studyID}/surveys`);
  };

  const handleEdit = (surveyID) => {
    history.push(`/study/${studyID}/surveys/${surveyID || "new"}`);
  };

  if (loading) {
    return (
      <Box h="500px">
        <Loader />
      </Box>
    );
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" my="15px" height="40px">
        <Heading fontSize="28px">Surveys</Heading>
        <Button colorScheme="blue" onClick={() => handleEdit()}>
          Add Survey
        </Button>
      </Flex>
      <SurveyList surveys={surveys} handleEdit={handleEdit} />
      {action && <SurveyEdit survey={survey} surveysRef={surveysRef} handleClose={handleClose} />}
    </Box>
  );
}

export default Surveys;
