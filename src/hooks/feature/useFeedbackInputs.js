import { useState } from "react";

function useFeedbackInputs(onSubmit) {
  // `onSubmit` must be a promise
  const [values, setValues] = useState({ title: "", body: "" });
  const [errors, setErrors] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(false);

  const check = (name, value) => {
    if (!value && name === "title") return "Title cannot be empty";
    if (!value && name === "body") return "Body cannot be empty";
    return "";
  };

  const validate = ({ title, body }) => ({
    title: check("title", title),
    body: check("body", body),
  });

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: check(name, value) }));
  };

  const handleSubmit = () => {
    const error = validate(values);

    if (error.title || error.body) {
      setErrors(error);
      return;
    }

    setLoading(true);
    onSubmit(values)
      .then(() => setValues({ title: "", body: "" }))
      .finally(() => setLoading(false));
  };

  return { values, errors, loading, handleChange, handleSubmit };
}

export default useFeedbackInputs;
