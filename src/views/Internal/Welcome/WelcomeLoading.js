import { Text } from "@chakra-ui/react";
import { Link, Loader } from "components";

function WelcomeLoading() {
  return (
    <>
      <Text mb="10px" color="gray.500">
        We are fetching studies associated with your email account from{" "}
        <Link to="https://clinicaltrials.gov">clinicaltrials.gov</Link>
      </Text>
      <Loader />
    </>
  );
}

export default WelcomeLoading;
