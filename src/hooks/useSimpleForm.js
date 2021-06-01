import { useState } from "react";

export const Form = ({ initial, validate, onSubmit }) => {
  const getInitialErrors = () => {
    const errors = {};

    Object.keys(initial).forEach((key) => {
      errors[key] = "";
    });

    return errors;
  };

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState(getInitialErrors());
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = async () => {
    try {
      const names = Object.keys(initial);
      const error = names.some((name) => errors[name]);

      if (error) {
        throw error;
      }

      setLoading(true);
      await onSubmit(values);
    } finally {
      setLoading(false);
    }
  };

  const input = (name) => {
    return {
      name,
      value: values[name],
      error: errors[name],
      handleChange: handleChange,
    };
  };

  return { input, loading, handleSubmit };
};

export default Form;
