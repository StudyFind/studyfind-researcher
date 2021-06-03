import React, { useState } from "react";
import { firestore } from "database/firebase";
import { useParams } from "react-router-dom";
import { Box, Button, Heading } from "@chakra-ui/react";
import Loader from "components/Loader";

import Survey from "./Survey";
import SurveyEdit from "./SurveyEdit";
import { useCollection } from "hooks";

function Surveys() {
  const { studyID } = useParams();
  const surveysRef = firestore.collection("studies").doc(studyID).collection("surveys");

  const [edit, setEdit] = useState(false);
  const [survey, setSurvey] = useState(null);
  const [surveys, loading, error] = useCollection(surveysRef);

  const handleEditSurvey = (survey) => {
    setEdit(true);
    survey && setSurvey(survey);
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return edit ? (
    <SurveyEdit survey={survey} surveysRef={surveysRef} setEdit={setEdit} edit={edit} />
  ) : (
    // <Drawer isOpen={edit} onClose={() => setEdit(false)} size="xl">
    //   <DrawerOverlay />
    //   <DrawerContent>
    //     <DrawerCloseButton position="static" />

    //     <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
    //     <DrawerBody>
    //       <SurveyEdit survey={survey} surveysRef={surveysRef} setEdit={setEdit} />
    //     </DrawerBody>
    //   </DrawerContent>
    // </Drawer>
    <Box>
      <Heading as="h2" fontSize="28px" mt="15px" mb="15px">
        Surveys
      </Heading>
      {surveys &&
        surveys.map((survey, i) => (
          <Survey
            setEdit={setEdit}
            surveyInfo={survey}
            handleEditSurvey={handleEditSurvey}
            edit={false}
            surveysRef={surveysRef}
            key={i}
          />
        ))}
      <Button
        colorScheme="green"
        w="90%"
        bg="green.300"
        color="white"
        m="6px"
        onClick={() => handleEditSurvey()}
      >
        Add Survey
      </Button>
    </Box>
  );
}

export default Surveys;
