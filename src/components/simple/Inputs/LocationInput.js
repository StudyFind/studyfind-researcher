import { usePlacesAutocomplete } from "hooks/usePlacesAutocomplete";
import { useState } from "react";
import { InputField, InputWrapper } from "./helpers";

export const LocationInput = ({ name, value, error, label, onChange }) => {
  const [text, setText] = useState("");
  const predictions = usePlacesAutocomplete(text);

  const handleTextChange = (_, value) => {
    setText(value);
  };

  return (
    <InputWrapper label={label} error={error}>
      <InputField
        name={name}
        value={text}
        error={error}
        onChange={handleTextChange}
      />
      {predictions.map((prediction) => (
        <div>{prediction?.structured_formatting?.main_text}</div>
      ))}
    </InputWrapper>
  );
};

export default LocationInput;
