import React, { useState } from "react";

import { auth } from "database/firebase";
import axios from "axios";

import { Form, Input, Button } from "components";

function FetchStudy({ setTab, setStudy, setStudyID }) {
  const [nctID, setNctID] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const checkValidID = (nctID) => {
    const lastEight = nctID.substr(nctID.length - 8);
    const isNumeric = /^\d+$/.test(lastEight);

    if (lastEight.length !== 8) return false;
    if (!isNumeric) return false;

    return "NCT" + lastEight;
  };

  const fetchStudy = () => {
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
            console.log("FETCHED");
            setTab("fields");
            setStudy(study);
            setStudyID(validID);
          } else {
            setError(error);
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
    <div>
      <Form onSubmit={fetchStudy}>
        <Input
          label
          name="nct_id"
          placeholder="NCT00000000"
          value={nctID}
          error={error}
          onChange={(_, value) => setNctID(value)}
        />
        <Button loading={loading}>Fetch</Button>
      </Form>
    </div>
  );
}

export default FetchStudy;
