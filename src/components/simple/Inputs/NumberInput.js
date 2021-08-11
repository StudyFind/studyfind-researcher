import {
  NumberInput as NumberInputWrapper,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
} from "@chakra-ui/react";
import { InputField, InputWrapper } from "./helpers";

export const NumberInput = ({
  name,
  value,
  error,
  label,
  placeholder,
  onChange,
  min,
  max,
  step = 1,
  precision = 0,
  ...rest
}) => {
  const handleChange = (value) => {
    onChange(name, value);
  };

  const stepperColor = useColorModeValue("gray.500", "gray.400");

  return (
    <InputWrapper label={label} error={error}>
      <InputField
        as={NumberInputWrapper}
        min={min}
        max={max}
        step={step}
        precision={precision}
        value={value}
        error={error}
        onChange={handleChange}
        {...rest}
      >
        <InputField
          as={NumberInputField}
          error={error}
          placeholder={placeholder}
        />
        <NumberInputStepper>
          <NumberIncrementStepper color={stepperColor} />
          <NumberDecrementStepper color={stepperColor} />
        </NumberInputStepper>
      </InputField>
    </InputWrapper>
  );
};
