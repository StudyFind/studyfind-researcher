import { useDetectDevice } from "hooks";

import { SimpleGrid, HStack, Heading } from "@chakra-ui/react";
import { Link, LoadMoreButton } from "components";

import StudyCardSmall from "components/feature/Study/StudyCard/StudyCardSmallResearcher";
import DashboardButton from "./DashboardButton";

function DashboardGrid({ verified, studies, fetchedAll, loadingMore, handleLoadMore }) {
  const { responsive } = useDetectDevice();

  return (
    <SimpleGrid spacing="25px">
      <HStack justify="space-between" align="center">
        <Heading size="lg">Dashboard</Heading>
        <DashboardButton verified={verified} />
      </HStack>
      <SimpleGrid spacing="25px" align="flex-start" columns={responsive([1, 2, 2])}>
        {studies.map((study) => (
          <Link key={study.id} to={`/study/${study.id}/details`} isWrapper>
            <StudyCardSmall study={study} />
          </Link>
        ))}
      </SimpleGrid>
      <HStack width="100%" justify="center">
        <LoadMoreButton
          fetchedAll={fetchedAll}
          fetchedAllText={`Showing all ${studies.length} studies`}
          isLoading={loadingMore}
          onClick={handleLoadMore}
        />
      </HStack>
    </SimpleGrid>
  );
}

export default DashboardGrid;
