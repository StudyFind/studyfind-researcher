import { Text, Button } from "@chakra-ui/react";
import { Link } from "@studyfind/components";

function WelcomeEmpty() {
  return (
    <>
      <Text mb="10px" color="gray.500">
        We could not find any studies that match your email on
        <Link to="https://clinicaltrials.gov"> clinicaltrials.gov</Link>. If you would like to add a
        study, please register your study on
        <Link to="https://clinicaltrials.gov"> clinicaltrials.gov</Link> and add your study to
        StudyFind using your registered study{"'"}s NCT ID. In case you{"'"}re wondering, we require
        that studies are registered on clinicaltrials.gov in an effort to simplify study creation
        and verify study owners.
      </Text>
      <Link to="/dashboard">
        <Button mt="20px" colorScheme="blue">
          Go to dashboard
        </Button>
      </Link>
    </>
  );
}

export default WelcomeEmpty;
