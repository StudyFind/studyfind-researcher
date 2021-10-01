import { datetime } from "utils";

import { Heading, Badge, VStack, HStack, Button, Text } from "@chakra-ui/react";
import { Card } from "components";

function SubscriptionView({
  redirecting,
  currentPlan,
  handleManageSubscription,
  planDetails,
}) {
  const { status, amount, current_period_end } = planDetails;

  const planColorScheme = {
    basic: "gray",
    standard: "cyan",
    premium: "green",
  };

  const message = {
    trailing: (
      <>
        Your subscription will be cancelled on{" "}
        <strong>{datetime.getFriendlyDate(current_period_end)}</strong>
      </>
    ),

    active: (
      <>
        Your card will be automatically charged{" "}
        <strong>${amount || "0"}</strong> on{" "}
        <strong>{datetime.getFriendlyDate(current_period_end)}</strong>
      </>
    ),
  }[status];

  return (
    <Card padding="15px">
      <VStack align="flex-start">
        <Heading size="sm">Current Plan</Heading>
        <Badge colorScheme={planColorScheme[currentPlan]}>{currentPlan}</Badge>
        <Text color="gray.500">{message}</Text>
        <HStack paddingTop="5px">
          <Button
            size="sm"
            onClick={handleManageSubscription}
            isLoading={redirecting}
          >
            Manage Subscription
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
}

export default SubscriptionView;
