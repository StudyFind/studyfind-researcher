import React from "react";
import styled from "styled-components";
import { Heading, Spinner, List } from "@chakra-ui/react";
import Notification from "./Notification";

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

  const LOAD = <Spinner />;

  const BODY = (
    <>
      <Head>
        <Heading fontSize="28px">Notifications</Heading>
      </Head>
      <List>
        {notifications.map((notification, index) => (
          <List.Row key={index}>
            <Notification notification={notification} />
          </List.Row>
        ))}
      </List>
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

export default Notifications;
