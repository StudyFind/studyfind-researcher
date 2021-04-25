import React, { useEffect, useState } from "react";
import { firestore } from "database/firebase";
import { auth } from "database/firebase";
import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
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
    surveys.map((survey) => <Survey surveyInfo={survey} />)
  ) : (
    <Text>Please add a survey!</Text>
  );
}

export default Surveys;
