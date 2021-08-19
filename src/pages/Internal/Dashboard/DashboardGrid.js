import { useDetectDevice } from "hooks";

import { Heading, Flex, SimpleGrid } from "@chakra-ui/react";
import { Link, LoadMoreButton } from "components";

import StudyCardSmall from "components/feature/Study/StudyCard/StudyCardSmallResearcher";
import DashboardButton from "./DashboardButton";

function DashboardGrid({ verified, studies, fetchedAll, loadingMore, handleLoadMore }) {
  const { responsive } = useDetectDevice();

  return (
    <SimpleGrid spacing="25px">
      <Flex justify="space-between" align="center">
        <Heading size="lg">Dashboard</Heading>
        <DashboardButton verified={verified} />
      </Flex>
      <SimpleGrid spacing="25px" columns={responsive([1, 2, 2])} align="flex-start">
        {studies.map((study) => (
          <Link key={study.id} to={`/study/${study.id}/details`} isWrapper>
            <StudyCardSmall key={study.id} study={study} />
          </Link>
        ))}
      </SimpleGrid>
      <Flex width="100%" justify="center">
        <LoadMoreButton
          fetchedAll={fetchedAll}
          fetchedAllText={`Showing all ${studies.length} studies`}
          isLoading={loadingMore}
          onClick={handleLoadMore}
        />
      </Flex>
    </SimpleGrid>
  );
}

export default DashboardGrid;
