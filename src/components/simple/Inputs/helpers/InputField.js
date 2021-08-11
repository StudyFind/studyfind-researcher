import { Input, useColorModeValue } from "@chakra-ui/react";

export const InputField = ({ as, error, ...rest }) => {
  const errorPlaceholderColor = useColorModeValue("red.400", "red.400");
  const errorBackground = useColorModeValue("red.100", "red.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBorderColor = useColorModeValue("gray.300", "gray.600");
  const placeholderColor = useColorModeValue("gray.400", "gray.500");

  const errorStyles = {
    background: errorBackground,
    _placeholder: { color: errorPlaceholderColor },
  };

  const Field = as || Input;

  return (
    <Field
      width="100%"
      autoComplete="off"
      borderColor={borderColor}
      _placeholder={{ color: placeholderColor }}
      _hover={{ borderColor: hoverBorderColor }}
      {...rest}
      {...(error ? errorStyles : {})}
    />
  );
};
