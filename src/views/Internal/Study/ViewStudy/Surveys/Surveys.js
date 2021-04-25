import React, { useEffect, useState } from "react";
import { firestore } from "database/firebase";
import { auth } from "database/firebase";
import { useParams } from "react-router-dom";
import { Box, Button, Text } from "@chakra-ui/react";
import Loader from "components/Loader";

import Survey from "./Survey";

function Surveys({ study }) {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState();
  const [editing, setEditing] = useState(false);

  const { nctID } = useParams();
  console.log(nctID);
  const surveyRef = firestore.collection("studies").doc(nctID).collection("surveys");
  useEffect(() => {
    setLoading(true);
    surveyRef.get().then((query) => {
      query.forEach((doc) => {
        if (doc.exists) {
          console.log(doc.data());
          setSurveys((oldSurveys) => [...oldSurveys, doc.data()]);
          console.log(surveys);
        }
      });
      setLoading(false);
    });
  }, []);
  console.log(surveys);
  if (loading) {
    return <Loader></Loader>;
  }
  return surveys.length > 0 ? (
    <Box>
      {surveys.map((survey) => (
        <Survey surveyInfo={survey} />
      ))}
      <Button w="90%" bg="green.300" color="white" m="6px">
        Add Survey
      </Button>
    </Box>
  ) : (
    <Text>Please add a survey!</Text>
  );
}

export default Surveys;
