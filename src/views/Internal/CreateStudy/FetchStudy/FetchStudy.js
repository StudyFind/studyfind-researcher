import React, { useState } from "react";
import { makeStudy } from "database/studies";

import FetchStudyView from "./FetchStudyView";

function FetchStudy({ setTab, setStudy }) {
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
      makeStudy(nctID)
        .then((data) => {
          const { study, error } = data;

          if (study) {
            setStudy(study);
            setTab("fields");
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
