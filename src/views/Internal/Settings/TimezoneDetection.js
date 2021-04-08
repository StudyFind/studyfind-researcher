import React from "react";

import { firestore } from "database/firebase";

import { Form, Heading } from "views/External/Auth/Blocks";
import { Box, Center, Switch, FormLabel, useToast } from "@chakra-ui/react";

function TimezoneDetection({ user }) {
    const toast = useToast();
    let isDetect = user.detectTimezone ?? true

    const toggleTimezoneDetection = () => {
        const target = !isDetect;
        return firestore
            .collection("researchers").doc(user.id)
            .update({
                detectTimezone: target,
            })
            .then(() => toast({
                title: `Timezone Detection ${target ? 'activated' : 'stopped'}`,
                description: `We will now ${target ? 'begin' : 'stop'} automatically changing your timezone`,
                status: "success",
                duration: 5000,
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
                        isChecked={isDetect}
                        onChange={toggleTimezoneDetection}
                    >Detect Timezone Automatically</Switch>
                </Center>
                <FormLabel htmlFor="email-notifications">
                    Disable to prevent StudyFind from automatically changing your set timezone as we detect shifts in your location
                </FormLabel>
            </Form>
        </Box>
    )

}

export default TimezoneDetection