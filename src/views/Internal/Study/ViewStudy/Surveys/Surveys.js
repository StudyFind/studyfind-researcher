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
  function addSurvey(id, editStatus) {
    if (!id) {
      const joined = surveys.concat({
        questions: null,
        title: null,
        editStatus: true,
      });
      setSurveys(() => {
        return joined;
      });
    }
    console.log(surveys);
  }
  useEffect(() => {
    setLoading(true);
    surveyRef.get().then((query) => {
      query.forEach((doc) => {
        if (doc.exists) {
          // console.log(doc.id);
          const data = doc.data();
          data.id = doc.id;
          console.log(data);
          setSurveys((oldSurveys) => [...oldSurveys, data]);
          // console.log(surveys);
        }
      });
      setLoading(false);
    });
  }, []);
  console.log(typeof surveys);
  if (loading) {
    return <Loader></Loader>;
  }
  return surveys.length > 0 ? (
    <Box>
      {surveys.map((survey, i) => (
        <Survey
          surveyInfo={survey}
          edit={survey["editStatus"] !== undefined}
          path={surveyRef}
          key={i}
        />
      ))}
      <Button w="90%" bg="green.300" color="white" m="6px" onClick={() => addSurvey(null, true)}>
        Add Survey
      </Button>
    </Box>
  ) : (
    <Button w="90%" bg="green.300" color="white" m="6px" onClick={() => addSurvey(null, true)}>
      Add Survey
    </Button>
  );
}

export default Surveys;
