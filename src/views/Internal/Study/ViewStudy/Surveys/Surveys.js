import React, { useEffect, useState } from "react";
import { firestore } from "database/firebase";
import { auth } from "database/firebase";
import { useParams } from "react-router-dom";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import Loader from "components/Loader";

import Survey from "./Survey";

function Surveys({ study }) {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState();
  const [editing, setEditing] = useState(false);

  const { nctID } = useParams();

  const surveyRef = firestore.collection("studies").doc(nctID).collection("surveys");
  function addSurvey() {
    const joined = surveys.concat({
      questions: null,
      title: null,
      editStatus: true,
    });
    setSurveys(() => {
      return joined;
    });
  }
  useEffect(() => {
    setLoading(true);
    surveyRef.get().then((query) => {
      query.forEach((doc) => {
        if (doc.exists) {
          const data = doc.data();
          data.id = doc.id;
          setSurveys((oldSurveys) => [...oldSurveys, data]);
        }
      });
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <Loader></Loader>;
  }
  return surveys.length > 0 ? (
    <Box>
      <Heading as="h2" fontSize="28px" mt="15px" mb="15px">
        Surveys
      </Heading>
      {surveys.map((survey, i) => (
        <Survey
          surveyInfo={survey}
          edit={survey["editStatus"] !== undefined}
          path={surveyRef}
          key={i}
        />
      ))}
      <Button
        colorScheme="green"
        w="90%"
        bg="green.300"
        color="white"
        m="6px"
        onClick={() => addSurvey()}
      >
        Add Survey
      </Button>
    </Box>
  ) : (
    <Button
      colorScheme="green"
      w="90%"
      bg="green.300"
      color="white"
      m="6px"
      onClick={() => addSurvey()}
    >
      Add Survey
    </Button>
  );
}

export default Surveys;
