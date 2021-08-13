import { useMediaQuery } from "@chakra-ui/react";

function useDevice() {
  const [isDesktop] = useMediaQuery("(min-width: 1280px)");
  const [isTablet] = useMediaQuery("(min-width: 768px)");
  const [isPhone] = useMediaQuery("(min-width: 375px)");

  return {
    isDesktop,
    isTablet: isTablet && !isDesktop,
    isPhone: isPhone && !isDesktop && !isTablet,
  };
}

export default useDevice;
