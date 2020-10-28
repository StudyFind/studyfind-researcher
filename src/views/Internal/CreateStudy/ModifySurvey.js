import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "components";

import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { firestore } from "database/firebase";
import { compute } from "functions";

function ModifyFields({ nctID }) {
  nctID = "NCT00000000";
  const ref = firestore.collection("studies").doc(nctID);
  const [data, retrieving] = useDocumentDataOnce(ref);
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {
    if (!retrieving) {
      if (data) {
        setInputs({
          title: data.title,
          description: data.shortDescription,
        });
      } else {
        setErrors({
          title: "Failed to load study data",
          description: "Failed to load study data",
        });
      }
    }
  }, [retrieving]);

  const check = (name, value) => {
    if (name === "title") {
      if (value.length > 100) {
        return "The best titles are fewer than 100 characters";
      }
    } else {
      if (value.length < 200 || value.length > 300) {
        return "The best descriptions are between 200 and 300 characters";
      }

      if (compute.readabilityIndex(value) > 16) {
        return "Description is too complicated for the general population";
      }
    }
  };

  const handleInputs = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: check(name, value) });
  };

  const handleSubmit = () => {
    const err = {
      title: check("title", inputs.title),
      description: check("description", inputs.description),
    };

    setErrors(err);

    if (Object.keys(err).some((v) => err[v])) {
      return;
    }

    ref
      .update({ title: inputs.title, shortDescription: inputs.description })
      .then(() => setSuccess(true))
      .catch(() => setSuccess(false))
      .finally(() => setLoading(false));
  };

  if (loading) return <div>Loading...</div>;
  if (success) return <div>Success :)</div>;

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        We at StudyFind strive to make research studies as accessible as possible. To achieve this,
        we ask that researchers simplify the language used in the study description by avoiding
        medical jargon and making it readable for the general population to improve their partipant
        recruitment
      </div>
      <Input
        label
        name="title"
        type="textarea"
        value={inputs.title}
        error={errors.title}
        onChange={handleInputs}
      />
      <Input
        label
        name="description"
        type="textarea"
        value={inputs.description}
        error={errors.description}
        onChange={handleInputs}
      />
      <Button>Submit</Button>
    </Form>
  );
}

export default ModifyFields;
