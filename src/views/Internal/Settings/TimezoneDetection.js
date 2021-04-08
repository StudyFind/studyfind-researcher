import React from "react";

import { firestore } from "database/firebase";

import { Form, Heading } from "views/External/Auth/Blocks";
import { Box, Center, Switch, FormLabel, useToast } from "@chakra-ui/react";

function TimezoneDetection({ user }) {
    const toast = useToast();

    const toggleTimezoneDetection = () => {
        const target = (!user.detectTimezone ?? false);
        return firestore
            .collection("researchers").doc(user.id)
            .update({
                detectTimezone: target,
            })
            .then(() => toast({
                title: `Timezone Detection ${target ? 'activated' : 'stopped'}`,
                description: `We will ${target ? 'begin' : 'now stop'} automatically changing your timezone as we detect shifts in your location.`,
                status: "success",
                duration: 2500,
                isClosable: true,
                position: "top",
            }))
            .catch(err => {
                console.error(err);
                toast({
                    title: `Failed to toggle timezone detection`,
                    description: `Action has failed: ${err}`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
            });
    }

    return (
        <Box w="350px" bg="white" borderWidth="1px" borderColor="gray" rounded="md">
            <Form>
                <Heading>Automatic Timezone Detection</Heading>
                <Center>
                    <Switch id="email-notifications" size="lg"
                        isChecked={user.detectTimezone ?? true}
                        onChange={toggleTimezoneDetection}
                    >Detect Timezone Automatically</Switch>
                </Center>
                <FormLabel htmlFor="email-notifications">
                    Disable to prevent StudyFind from automatically changing your set timezone
                </FormLabel>
            </Form>
        </Box>
    )

}

export default TimezoneDetection