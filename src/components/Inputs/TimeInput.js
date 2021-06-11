import { Input, FormControl } from "@chakra-ui/react";
import { Label, Error } from "./helpers";

export const TimeInput = ({ name, value, error, label, onChange, ...rest }) => {
  const handleChange = (e) => {
    onChange(name, e.target.value);
  };

  return (
    <FormControl isInvalid={error}>
      <Label label={label} />
      <Input
        type="time"
        w="100%"
        bg={error ? "red.100" : ""}
        value={value}
        onChange={handleChange}
        {...rest}
      />
      <Error error={error} />
    </FormControl>
  );
};
