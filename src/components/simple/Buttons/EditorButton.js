import { useColor } from "hooks";
import { Button } from "@chakra-ui/react";

export const EditorButton = ({
  children,
  icon,
  color = "gray",
  onClick,
  ...rest
}) => {
  const colorText = useColor(`${color}.500`, `${color}.400`);
  const colorBack = useColor(`${color}.100`, `${color}.900`);
  const colorHover = useColor(`${color}.200`, `${color}.800`);
  const colorBorder = useColor(`${color}.500`, `${color}.400`);

  return (
    <Button
      size="sm"
      leftIcon={icon}
      background={colorBack}
      color={colorText}
      borderWidth="1px"
      borderColor={colorBorder}
      _hover={{ bg: colorHover }}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Button>
  );
};
