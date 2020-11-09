import React, { useState } from "react";
import { auth } from "database/firebase";
import axios from "axios";

import FetchStudyView from "./FetchStudyView";

function FetchStudy({ setTab, setStudy, setStudyID }) {
  const [nctID, setNctID] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const checkValidID = (nctID) => {
    const lastEight = nctID.substr(nctID.length - 8);
    const isNumeric = /^\d+$/.test(lastEight);

    if (lastEight.length !== 8) return false;
    if (!isNumeric) return false;

    return "NCT" + lastEight;
  };

  const handleChange = (_, value) => {
    setNctID(value);
    setError("");
  };

  const handleSubmit = () => {
    const validID = checkValidID(nctID);

    if (validID) {
      setError("");
      setLoading(true);
      auth.currentUser
        .getIdToken(false)
        .then(async (token) => {
          const response = await axios.get(
            "https://us-central1-studyfind-researcher.cloudfunctions.net/makeStudy",
            {
              params: {
                nctID: validID,
                idToken: token,
              },
            }
          );

          const { study, error } = response.data;
          console.log(response.data);

          if (study) {
            setTab("fields");
            setStudy(study);
            setStudyID(validID);
          } else {
            setError("Entered ID does not exist");
          }
        })
        .catch((err) => {
          setError("Unable to authenticate user");
        })
        .finally(() => setLoading(false));
    } else {
      setError("The entered NCT ID is invalid");
    }
  };

  return (
    <FetchStudyView
      nctID={nctID}
      error={error}
      loading={loading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default FetchStudy;
