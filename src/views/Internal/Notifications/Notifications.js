import React from "react";
import styled from "styled-components";
import { Heading, Box, Spinner } from "@chakra-ui/react";
import NotificationsRow from "./NotificationsRow";

function Notifications() {
  const loading = false;
  const notifications = [
    {
      title: "New Participant!",
      description:
        "A new participant Amazing Alpaca showed interest in your study titled blah blah blah",
      type: "interest",
      timestamp: 1606778762,
    },
    {
      title: "New Participant!",
      description:
        "A new participant Mindful Monkey showed interest in your study titled blah blah blah",
      type: "message",
      timestamp: 1606778762,
    },
    {
      title: "50 participants!",
      description: "Your study titled blah blah blah recruited 50 participants in total",
      type: "milestone",
      timestamp: 1606778762,
    },
    {
      title: "Appointment Reminder",
      description:
        "This is to remind you about your call with Lazy Llama at 11:00pm on Sunday, October 31st",
      type: "reminder",
      timestamp: 1606778762,
    },
  ];

  const LOAD = (
    <PageLoader>
      <Spinner />
    </PageLoader>
  );

  const BODY = (
    <>
      <Head>
        <Heading fontSize="28px">Notifications</Heading>
      </Head>
      <Box borderWidth="1px" rounded="md" overflow="hidden" bg="white">
        {notifications.map((notification, index) => (
          <NotificationsRow key={index} notification={notification} />
        ))}
      </Box>
    </>
  );

  return <Page>{loading ? LOAD : BODY}</Page>;
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

const Page = styled.div`
  padding: 20px;
  height: 100%;
  background: #f8f9fa;
`;

const PageLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default Notifications;
