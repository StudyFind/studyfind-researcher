import React, { useState } from "react";
import axios from "axios";

import { Form, Input, Button } from "components";

function FetchStudy() {
  const [nctID, setNctID] = useState("");
  const [error, setError] = useState();

  const checkValidID = (nctID) => {
    const lastEight = nctID.substr(nctID.length - 8);
    const isNumeric = /^\d+$/.test(lastEight);

    if (lastEight.length !== 8) return false;
    if (!isNumeric) return false;

    return lastEight;
  };

  const fetchStudy = () => {
    const validID = checkValidID(nctID);
    console.log(validID);
    if (validID) {
      // TODO: call make-study cloud function here
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
          onChange={(name, value) => setNctID(value)}
        />
        <Button>Fetch</Button>
      </Form>
    </div>
  );
}

export default FetchStudy;
