import React, { useState } from 'react';
import styled from 'styled-components';

import { Card, Input, Button } from 'components';
import { Box, Pill, Heading, Subheading } from 'views/External/Home/styles';

function Contact() {
  const [inputs, setInputs] = useState({});

  const handleInput = (name, value) => {
    setInputs({ ...inputs, [name]: value });
  }

  const submitForm = () => {
    // submitFeedback()
  }

  return (
    <Box id="contact">
      <Pill size="sm" color="success" type="soft"> Contact </Pill>
      <Heading> Feedback or Suggestions? </Heading>
      <Subheading> We're always open to hearing more about your valuable insights </Subheading>

      <ContactForm>
        <ContactEmail name="email" type="email" value={inputs.email} onChange={handleInput} />
        <ContactMessage name="message" type="textarea" value={inputs.message} onChange={handleInput} />
        <Button onClick={submitForm}> Send Message </Button>
      </ContactForm>
    </Box>
  )
}

const ContactForm = styled(Card)`
  display: grid;
  grid-gap: 25px;
  width: 500px;

  @media only screen and (max-width: 600px) {
    width: 80vw;
  }
`;

const ContactEmail = styled(Input)``
const ContactMessage = styled(Input)`
  height: 140px;
`;

export default Contact;
