import React, { useEffect } from "react";

import { firestore } from "database/firebase";

import { Form, Heading } from "views/External/Auth/Blocks";
import { Box, Center, Switch, FormLabel, useToast } from "@chakra-ui/react";

function ChangeEmailNotification({ user }) {
    const toast = useToast();

    const toggleEmailNotification = () => {
        const target = (!user.emailNotification ?? false)
        return firestore
            .collection("researchers").doc(user.id)
            .update({
                emailNotification: target,
            })
            .then(() => toast({
                title: `Email ${target ? 'S' : 'Uns'}ubscribed`,
                description: `You will ${target ? 'now' : 'no longer'} recieve emails for important notifications`,
                status: "success",
                duration: 2500,
                isClosable: true,
                position: "top",
            }))
            .catch((err) => {
                console.error(err);
                toast({
                    title: `Failed to ${target ? 'S': 'Uns'}ubscribe`,
                    description: `Action has failed: ${err}`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top"
                })
            });
    }

    return (
        <Box w="350px" bg="white" borderWidth="1px" borderColor="gray" rounded="md">
            <Form>
                <Heading>Email Alerts</Heading>
                <Center>
                    <Switch id="email-notifications" size="lg"
                        isChecked={user.emailNotification ?? true}
                        onChange={toggleEmailNotification}
                    >Email Notifications</Switch>
                </Center>
                <FormLabel htmlFor="email-notifications">
                    Enable email alerts to recieve important notifications directly into your email inbox.
                </FormLabel>
            </Form>
        </Box>
    );
}

export default ChangeEmailNotification;
