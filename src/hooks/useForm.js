import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

function useForm({ initial, validate, submit }) {
  const toast = useToast();

  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const triggerErrorToast = () => {
    toast({
      title: "Connection Error!",
      description:
        "Your action could not be completed because of a connection error. Please try again later.",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const check = (name, value) => validate({ [name]: value })[name];

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: check(name, value) }));
  };

  const handleReset = () => {
    const error = validate(initial);
    const empty = Object.keys(initial).every((k) => !initial[k]);

    setInputs(initial);
    !empty && setErrors(error);
  };

  const handleSubmit = () => {
    const error = validate(inputs);
    const valid = Object.values(error).every((v) => !v);

    if (!valid) {
      setErrors(error);
      setLoading(false);
      return;
    }

    return submit(inputs)
      .then(() => handleReset())
      .catch(() => triggerErrorToast())
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleReset();
  }, []);

  return { inputs, errors, loading, setInputs, setErrors, handleChange, handleReset, handleSubmit };
}

export default useForm;
