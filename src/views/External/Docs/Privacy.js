import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import Logo from "views/External/Logo";

function Privacy() {
  return (
    <Box p="40px">
      <Box mb="50px">
        <Logo />
      </Box>

      <Heading size="md">PRIVACY NOTICE</Heading>
      <Text color="gray.500">Last updated May 4th, 2021</Text>

      <Box my="20px" fontSize="0.8rem">
        <Text>
          Thank you for choosing to be part of our community at StudyFind, Inc ("Company", "we",
          "us", "our"). We are committed to protecting your personal information and your right to
          privacy. If you have any questions or concerns about this privacy notice, or our practices
          with regards to your personal information, please contact us at studyfindcom@gmail.org.
        </Text>
        <Text>
          When you use any of our services (the "Services", which include all of our software), we
          appreciate that you are trusting us with your personal information. We take your privacy
          very seriously. In this privacy notice, we seek to explain to you in the clearest way
          possible what information we collect, how we use it and what rights you have in relation
          to it. We hope you review this privacy notice carefully, as it is important. If there are
          any terms in this privacy notice that you do not agree with, please discontinue use of our
          Services immediately.
        </Text>
        <Text>
          This privacy notice applies to all information collected through our Services (which, as
          described above, includes our software), as well as any related services, sales,
          marketing, or events.
        </Text>
      </Box>

      <Box>
        <Heading size="sm">1. WHAT INFORMATION DO WE COLLECT?</Heading>
        <Heading size="sm">A) Personal information you disclose to us</Heading>
        <Text>StudyFind collects personal information that you provide to us.</Text>
        <Text>
          We collect personal information that you voluntarily provide to us when you register on
          the express an interest in obtaining information about us or our products and Services,
          when you participate in activities on the (such as by posting messages in our online
          forums or entering competitions, contests, or giveaways) or otherwise when you contact us.
        </Text>
        <Text>
          The personal information that we collect depends on the context of your interactions with
          us, the choices you make, and the products and features you use. The personal information
          we collect may include the following:
        </Text>
        <Text>
          Social Media Login Data. We may provide you with the option to register with us using your
          existing social media account details, like your Facebook, Twitter, or other social media
          account. If you choose to register in this way, we will collect the information described
          in the section called "HOW DO WE HANDLE YOUR SOCIAL LOGINS?" below.
        </Text>
        <Text>
          All personal information that you provide to us must be true, complete, and accurate, and
          you must notify us of any changes to such personal information.
        </Text>
        <Heading size="sm">B) Information automatically collected</Heading>
        <Text>
          Some information — such as your Internet Protocol (IP) address and/or browser and device
          characteristics — is collected automatically when you visit our website.
        </Text>
        <Text>
          We automatically collect certain information when you visit, use or navigate the
          studyfind.org website. This information does not reveal your specific identity (like your
          name or contact information) but may include device and usage information, such as your IP
          address, browser and device characteristics, operating system, language preferences,
          referring URLs, device name, country, location, information about how and when you use our
          and other technical information. This information is primarily needed to maintain the
          security and operation of our software, and for our internal analytics and reporting
          purposes.
        </Text>
        <Text>
          Like many businesses, we also collect information through cookies and similar
          technologies.
        </Text>
      </Box>

      <Box>
        <Heading>2. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</Heading>
      </Box>
    </Box>
  );
}

export default Privacy;
